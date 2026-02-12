import { NextRequest, NextResponse } from 'next/server';
import { generateKindlePDF } from '@/lib/pdf-utils';
import { sanitizeFilename } from '@/lib/crawl-utils';

export async function POST(request: NextRequest) {
  try {
    const { title, content, url } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    console.log('[v0] Generating PDF for:', title);

    const pdfBuffer = await generateKindlePDF({
      title,
      content,
      url,
    });

    const filename = `${sanitizeFilename(url || title)}.pdf`;

    console.log('[v0] PDF generated successfully:', filename);

    // Return PDF as binary data
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('[v0] PDF generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
