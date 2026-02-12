'use client';

import { useProgressStream } from '@/lib/hooks/use-progress-stream';
import { ConverterForm } from '@/components/converter-form';
import { ProgressDisplay } from '@/components/progress-display';

export default function Page() {
  const { events, isProcessing, error, startProcessing, reset } = useProgressStream();

  const handleSubmit = (blogUrl: string, kindleEmail: string, postLimit?: number) => {
    reset();
    startProcessing(blogUrl, kindleEmail, postLimit);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Blog to Kindle</h1>
          <p className="text-slate-400">
            Convert your favorite blog posts to Kindle-optimized PDFs
          </p>
        </div>

        {/* Form */}
        <ConverterForm onSubmit={handleSubmit} isProcessing={isProcessing} />

        {/* Progress Display */}
        <ProgressDisplay events={events} isProcessing={isProcessing} error={error} />
      </div>
    </main>
  );
}
