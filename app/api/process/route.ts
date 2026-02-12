import { NextRequest } from 'next/server';
import { discoverBlogPosts, extractBlogContent, sanitizeFilename } from '@/lib/crawl-utils';
import { generateKindlePDF } from '@/lib/pdf-utils';
import { sendPdfToKindle } from '@/lib/email-utils';

interface StreamEvent {
  type: 'crawling' | 'generating' | 'sending' | 'complete' | 'error';
  message?: string;
  postIndex?: number;
  title?: string;
  email?: string;
  successful?: number;
  failed?: number;
}

function encodeEvent(event: StreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(request: NextRequest) {
  try {
    const { blogUrl, kindleEmail, postLimit } = await request.json();

    if (!blogUrl || !kindleEmail) {
      return new Response('Missing required parameters', { status: 400 });
    }

    // Create a readable stream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let successCount = 0;
          let failCount = 0;

          // Step 1: Crawl blog
          controller.enqueue(encodeEvent({
            type: 'crawling',
            message: 'Discovering blog posts...',
          }));

          const postUrls = await discoverBlogPosts(blogUrl, postLimit || 10);

          if (postUrls.length === 0) {
            controller.enqueue(encodeEvent({
              type: 'error',
              message: 'No blog posts found',
            }));
            controller.close();
            return;
          }

          // Step 2: Process each post
          for (let i = 0; i < postUrls.length; i++) {
            const postUrl = postUrls[i];

            try {
              // Extract content
              controller.enqueue(encodeEvent({
                type: 'generating',
                postIndex: i + 1,
                message: `Extracting content from post ${i + 1}/${postUrls.length}...`,
              }));

              const post = await extractBlogContent(postUrl);

              // Generate PDF
              controller.enqueue(encodeEvent({
                type: 'generating',
                postIndex: i + 1,
                title: post.title,
                message: `Generating PDF for: ${post.title}...`,
              }));

              const pdfBuffer = await generateKindlePDF({
                title: post.title,
                content: post.content,
                url: post.url,
              });

              // Send email
              controller.enqueue(encodeEvent({
                type: 'sending',
                postIndex: i + 1,
                title: post.title,
                email: kindleEmail,
                message: `Sending to Kindle: ${post.title}...`,
              }));

              await sendPdfToKindle({
                to: kindleEmail,
                subject: 'CONVERT',
                filename: `${sanitizeFilename(post.url)}.pdf`,
                pdfBuffer,
                title: post.title,
              });

              successCount++;

              controller.enqueue(encodeEvent({
                type: 'complete',
                postIndex: i + 1,
                successful: successCount,
                failed: failCount,
                message: `Successfully processed: ${post.title}`,
              }));
            } catch (error) {
              failCount++;
              console.error(`[v0] Error processing post ${i + 1}:`, error);

              controller.enqueue(encodeEvent({
                type: 'error',
                postIndex: i + 1,
                message: `Failed to process post: ${error instanceof Error ? error.message : 'Unknown error'}`,
              }));
            }

            // Small delay to avoid overwhelming server
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          // Final summary
          controller.enqueue(encodeEvent({
            type: 'complete',
            successful: successCount,
            failed: failCount,
            message: `Processing complete. Successfully sent ${successCount} posts, ${failCount} failed.`,
          }));

          controller.close();
        } catch (error) {
          console.error('[v0] Stream processing error:', error);
          controller.enqueue(encodeEvent({
            type: 'error',
            message: error instanceof Error ? error.message : 'Unknown error occurred',
          }));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[v0] Request processing error:', error);
    return new Response(
      `data: ${JSON.stringify({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to start processing',
      })}\n\n`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/event-stream' },
      }
    );
  }
}
