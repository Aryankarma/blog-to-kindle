# Blog to Kindle Converter - Setup Guide

## Overview
This application converts blog posts into Kindle-optimized PDFs and sends them directly to your Kindle email address.

## Environment Variables

You need to configure the following SMTP variables:

### SMTP Configuration
- `SMTP_HOST` - Your SMTP server hostname (e.g., smtp.gmail.com, smtp-mail.outlook.com)
- `SMTP_PORT` - Your SMTP server port (typically 587 for TLS, 465 for SSL)
- `SMTP_USER` - Your SMTP username/email
- `SMTP_PASSWORD` - Your SMTP password or app-specific password

### Example: Gmail Setup
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
```

**Note for Gmail users:** You'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password for security.

### Example: Outlook Setup
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

## Features

### Blog Crawler
- Automatically crawls blog URLs and extracts article content
- Uses Puppeteer for reliable HTML rendering
- Extracts metadata (title, author, date, description)
- Handles article pagination

### PDF Generation
- Converts extracted content to Kindle-optimized PDFs
- Uses Puppeteer for high-quality rendering
- Applies Kindle formatting guidelines
- Includes table of contents for multi-article conversions

### Email Delivery
- Sends PDFs directly to your Kindle email address
- Uses Nodemailer with SMTP for reliable delivery
- Supports batch processing of multiple articles

### Real-time Progress Tracking
- Server-Sent Events (SSE) for live progress updates
- Step-by-step processing status
- Error handling with detailed feedback

## API Endpoints

### POST /api/process
Main orchestrator endpoint. Handles crawling, PDF generation, and email delivery with real-time progress updates via SSE.

**Request Body:**
```json
{
  "blogUrl": "https://example-blog.com",
  "kindleEmail": "your-email@kindle.com",
  "postLimit": 5
}
```

**Response:** Server-sent events stream with progress updates

### POST /api/crawl
Crawls a blog URL and returns extracted articles.

**Request Body:**
```json
{
  "blogUrl": "https://example-blog.com",
  "postLimit": 5
}
```

### POST /api/generate-pdf
Generates a PDF from article content.

**Request Body:**
```json
{
  "articles": [
    {
      "title": "Article Title",
      "content": "<html>...</html>",
      "author": "Author Name",
      "date": "2024-01-15"
    }
  ]
}
```

### POST /api/send-email
Sends a PDF to a Kindle email address.

**Request Body:**
```json
{
  "pdfBuffer": "base64-encoded-pdf",
  "recipient": "user@kindle.com",
  "subject": "Blog Articles"
}
```

## Limitations & Notes

- Puppeteer browser launch requires sufficient system memory
- Long-running conversions may timeout on serverless platforms
- Some JavaScript-heavy blogs may not render completely
- PDFs are optimized for Kindle e-ink displays

## Troubleshooting

### SMTP Connection Errors
- Verify your SMTP credentials are correct
- Check that your firewall allows outbound SMTP connections
- For Gmail, ensure you're using an App Password
- Test your SMTP settings with a simple test email

### PDF Generation Issues
- Large blogs may take longer to process
- Complex CSS may not render perfectly
- Try reducing the post limit to isolate problematic articles

### Email Not Arriving
- Check your Kindle email whitelist settings
- Verify the recipient email is a valid Kindle address
- Check spam folder in your email provider

## Development

To run locally:

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to use the application.
