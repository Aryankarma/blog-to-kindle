import { NextRequest, NextResponse } from 'next/server';
import { discoverBlogPosts, extractBlogContent } from '@/lib/crawl-utils';

export async function POST(request: NextRequest) {
  try {
    const { url, limit } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log('[v0] Starting blog crawl for:', url);

    // Discover blog posts
    const postUrls = await discoverBlogPosts(url, limit || 10);
    console.log(`[v0] Discovered ${postUrls.length} blog posts`);

    // Extract content from each post
    const posts = [];
    for (const postUrl of postUrls) {
      try {
        const post = await extractBlogContent(postUrl);
        posts.push(post);
      } catch (error) {
        console.error(`[v0] Failed to extract content from ${postUrl}:`, error);
        // Continue with next post on error
      }
    }

    console.log(`[v0] Successfully extracted ${posts.length} posts`);

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
    });
  } catch (error) {
    console.error('[v0] Crawl error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to crawl blog' },
      { status: 500 }
    );
  }
}
