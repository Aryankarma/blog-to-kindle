import PDFDocument from 'pdfkit';
import { convert } from 'html-to-text';

interface PDFOptions {
  title: string;
  content: string;
  url?: string;
}

/**
 * Generate a Kindle-optimized PDF from blog content
 */
export async function generateKindlePDF(options: PDFOptions): Promise<Buffer> {
  try {
    // Convert HTML content to plain text
    const plainText = convert(options.content, {
      wordwrap: 100,
      preserveNewlines: true,
    });

    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margins: {
            top: 40,
            bottom: 40,
            left: 40,
            right: 40,
          },
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk: Buffer) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Title
        doc.fontSize(24).font('Helvetica-Bold').text(options.title, { align: 'center' });
        doc.moveDown(0.5);

        // Metadata
        doc.fontSize(10)
          .font('Helvetica')
          .text(`Source: ${options.url || 'Unknown'}`, { align: 'left' });
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'left' });
        doc.moveDown(1);

        // Add horizontal line
        doc.moveTo(40, doc.y).lineTo(555, doc.y).stroke();
        doc.moveDown(1);

        // Content
        doc.fontSize(12)
          .font('Helvetica')
          .text(plainText, {
            align: 'left',
            lineGap: 4,
          });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error('[v0] Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}
