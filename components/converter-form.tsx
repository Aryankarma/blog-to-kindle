"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface ConverterFormProps {
  onSubmit: (blogUrl: string, kindleEmail: string, postLimit?: number) => void;
  isProcessing: boolean;
}

export function ConverterForm({ onSubmit, isProcessing }: ConverterFormProps) {
  const [blogUrl, setBlogUrl] = useState("https://nav.al");
  const [kindleEmail, setKindleEmail] = useState("aryankarma29@gmail.com");
  const [postLimit, setPostLimit] = useState("2");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!blogUrl.trim()) {
      newErrors.blogUrl = "Blog URL is required";
    } else {
      try {
        new URL(blogUrl);
      } catch {
        newErrors.blogUrl = "Please enter a valid URL";
      }
    }

    if (!kindleEmail.trim()) {
      newErrors.kindleEmail = "Kindle email is required";
    } else if (!kindleEmail.includes("@")) {
      newErrors.kindleEmail = "Please enter a valid email address";
    }

    const limit = parseInt(postLimit, 10);
    if (isNaN(limit) || limit < 1) {
      newErrors.postLimit = "Post limit must be a positive number";
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
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Shadow under the card */}
      <div className="absolute -bottom-4 left-4 right-4 h-20 rounded-3xl bg-ink/5 blur-2xl" />

      <Card className="relative overflow-hidden rounded-2xl border border-[#e0e0e0] bg-[#ffffff] p-8 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog URL Input */}
          <div className="space-y-2">
            <Label
              htmlFor="blogUrl"
              className="text-[13px] font-medium text-stone uppercase tracking-wider"
            >
              Blog URL
            </Label>
            <Input
              id="blogUrl"
              type="url"
              placeholder="https://example.com/blog"
              value={blogUrl}
              onChange={(e) => setBlogUrl(e.target.value)}
              disabled={isProcessing}
              className="h-12 border-[#e8e8e8] bg-cream/50 px-4 font-mono text-[14px] text-ink transition-all focus:border-ink/20 focus:ring-0 placeholder:text-stone/50"
            />
            {errors.blogUrl && (
              <p className="text-red-500 text-xs font-medium">
                {errors.blogUrl}
              </p>
            )}
          </div>

          {/* Kindle Email Input */}
          <div className="space-y-2">
            <Label
              htmlFor="kindleEmail"
              className="text-[13px] font-medium text-stone uppercase tracking-wider"
            >
              Kindle Email Address
            </Label>
            <Input
              id="kindleEmail"
              type="email"
              placeholder="your-name@kindle.com"
              value={kindleEmail}
              onChange={(e) => setKindleEmail(e.target.value)}
              disabled={isProcessing}
              className="h-12 border-[#e8e8e8] bg-cream/50 px-4 font-mono text-[14px] text-ink transition-all focus:border-ink/20 focus:ring-0 placeholder:text-stone/50"
            />
            {errors.kindleEmail && (
              <p className="text-red-500 text-xs font-medium">
                {errors.kindleEmail}
              </p>
            )}
            <p className="text-[12px] text-stone/70 italic">
              Find this in your Amazon account settings under `Manage Your
              Content and Devices`.
            </p>
          </div>

          {/* Post Limit Input */}
          <div className="space-y-2">
            <Label
              htmlFor="postLimit"
              className="text-[13px] font-medium text-stone uppercase tracking-wider"
            >
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
              className="h-12 w-24 border-[#e8e8e8] bg-cream/50 px-4 font-mono text-[14px] text-ink transition-all focus:border-ink/20 focus:ring-0"
            />
            {errors.postLimit && (
              <p className="text-red-500 text-xs font-medium">
                {errors.postLimit}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isProcessing}
              className="h-12 w-full rounded-full bg-ink text-[14px] font-medium text-white transition-all hover:bg-ink/90 hover:shadow-lg disabled:opacity-70"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </span>
              ) : (
                "Start Conversion"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
