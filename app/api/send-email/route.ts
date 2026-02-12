import { NextRequest, NextResponse } from 'next/server';
import { sendPdfToKindle } from '@/lib/email-utils';
import { sanitizeFilename } from '@/lib/crawl-utils';

export async function POST(request: NextRequest) {
  try {
    const { title, pdfBuffer, kindleEmail } = await request.json();

    if (!title || !pdfBuffer || !kindleEmail) {
      return NextResponse.json(
        { error: 'Title, PDF buffer, and Kindle email are required' },
        { status: 400 }
      );
    }

    // Decode base64 PDF buffer
    const buffer = Buffer.from(pdfBuffer, 'base64');

    console.log('[v0] Sending email to:', kindleEmail);

    await sendPdfToKindle({
      to: kindleEmail,
      subject: 'CONVERT',
      filename: `${sanitizeFilename(title)}.pdf`,
      pdfBuffer: buffer,
      title,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully to Kindle',
    });
  } catch (error) {
    console.error('[v0] Email sending error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}
