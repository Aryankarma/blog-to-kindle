import axios from 'axios';
import * as cheerio from 'cheerio';
import { parse } from 'node-html-parser';

interface BlogPost {
  url: string;
  title: string;
  content: string;
}

/**
 * Discover all blog post URLs from a given blog domain
 */
export async function discoverBlogPosts(blogUrl: string, limit?: number): Promise<string[]> {
  try {
    // Normalize URL
    const baseUrl = new URL(blogUrl).origin;
    
    // Fetch the main page
    const response = await axios.get(blogUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const links = new Set<string>();

    // Look for common blog post link patterns
    $('a[href*="/post/"], a[href*="/blog/"], a[href*="/article/"], article a, .post a').each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        try {
          const absoluteUrl = new URL(href, baseUrl).toString();
          if (absoluteUrl.startsWith(baseUrl)) {
            links.add(absoluteUrl);
          }
        } catch (e) {
          // Invalid URL, skip
        }
      }
    });

    const postUrls = Array.from(links).slice(0, limit || 50);
    return postUrls;
  } catch (error) {
    console.error('[v0] Error discovering blog posts:', error);
    throw new Error(`Failed to discover blog posts from ${blogUrl}`);
  }
}

/**
 * Extract title and main content from a blog post
 */
export async function extractBlogContent(postUrl: string): Promise<BlogPost> {
  try {
    const response = await axios.get(postUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // Extract title - try multiple selectors
    let title =
      $('h1').first().text().trim() ||
      $('title').text().split('|')[0].trim() ||
      $('meta[property="og:title"]').attr('content') ||
      'Untitled';

    // Extract content - target main content area
    let content = '';

    // Try common content containers
    const contentSelectors = [
      'article',
      '.post-content',
      '.post-body',
      '.entry-content',
      '[class*="content"]',
      'main',
    ];

    for (const selector of contentSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        content = element.html() || '';
        break;
      }
    }

    // If no content found, use body
    if (!content) {
      content = $('body').html() || '';
    }

    // Clean content: remove scripts, styles, and ads
    const root = parse(content);
    root.querySelectorAll('script, style, nav, footer, .ads, [class*="sidebar"]').forEach(node => {
      node.remove();
    });

    // Extract text
    const cleanedContent = root.text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');

    return {
      url: postUrl,
      title: title.substring(0, 200), // Limit title length
      content: cleanedContent.substring(0, 50000), // Limit content length for PDF
    };
  } catch (error) {
    console.error(`[v0] Error extracting content from ${postUrl}:`, error);
    throw new Error(`Failed to extract content from ${postUrl}`);
  }
}

/**
 * Convert URL to safe filename
 */
export function sanitizeFilename(url: string): string {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    return `${path}-${Date.now()}`.substring(0, 100);
  } catch {
    return `blog-${Date.now()}`;
  }
}
