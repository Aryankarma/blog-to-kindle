'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface ConverterFormProps {
  onSubmit: (blogUrl: string, kindleEmail: string, postLimit?: number) => void;
  isProcessing: boolean;
}

export function ConverterForm({ onSubmit, isProcessing }: ConverterFormProps) {
  const [blogUrl, setBlogUrl] = useState('https://nav.al');
  const [kindleEmail, setKindleEmail] = useState('aryankarma29@gmail.com');
  const [postLimit, setPostLimit] = useState('2');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!blogUrl.trim()) {
      newErrors.blogUrl = 'Blog URL is required';
    } else {
      try {
        new URL(blogUrl);
      } catch {
        newErrors.blogUrl = 'Please enter a valid URL';
      }
    }

    if (!kindleEmail.trim()) {
      newErrors.kindleEmail = 'Kindle email is required';
    } else if (!kindleEmail.includes('@')) {
      newErrors.kindleEmail = 'Please enter a valid email address';
    }

    const limit = parseInt(postLimit, 10);
    if (isNaN(limit) || limit < 1) {
      newErrors.postLimit = 'Post limit must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const limit = parseInt(postLimit, 10);
    onSubmit(blogUrl, kindleEmail, limit);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-slate-900 border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog URL Input */}
        <div className="space-y-2">
          <Label htmlFor="blogUrl" className="text-slate-200">
            Blog URL
          </Label>
          <Input
            id="blogUrl"
            type="url"
            placeholder="https://example.com/blog"
            value={blogUrl}
            onChange={(e) => setBlogUrl(e.target.value)}
            disabled={isProcessing}
            className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500"
          />
          {errors.blogUrl && (
            <p className="text-red-400 text-sm">{errors.blogUrl}</p>
          )}
        </div>

        {/* Kindle Email Input */}
        <div className="space-y-2">
          <Label htmlFor="kindleEmail" className="text-slate-200">
            Kindle Email Address
          </Label>
          <Input
            id="kindleEmail"
            type="email"
            placeholder="your-name@kindle.com"
            value={kindleEmail}
            onChange={(e) => setKindleEmail(e.target.value)}
            disabled={isProcessing}
            className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500"
          />
          {errors.kindleEmail && (
            <p className="text-red-400 text-sm">{errors.kindleEmail}</p>
          )}
          <p className="text-xs text-slate-400">
            Your Kindle device&apos;s email address. Find it in Amazon account settings.
          </p>
        </div>

        {/* Post Limit Input */}
        <div className="space-y-2">
          <Label htmlFor="postLimit" className="text-slate-200">
            Number of Posts
          </Label>
          <Input
            id="postLimit"
            type="number"
            min="1"
            max="100"
            placeholder="2"
            value={postLimit}
            onChange={(e) => setPostLimit(e.target.value)}
            disabled={isProcessing}
            className="bg-slate-800 border-slate-600 text-slate-100"
          />
          {errors.postLimit && (
            <p className="text-red-400 text-sm">{errors.postLimit}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 h-10"
        >
          {isProcessing ? 'Processing...' : 'Start Conversion'}
        </Button>
      </form>
    </Card>
  );
}
