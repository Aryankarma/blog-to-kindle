'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { StreamEvent } from '@/lib/hooks/use-progress-stream';

interface ProgressDisplayProps {
  events: StreamEvent[];
  isProcessing: boolean;
  error: string | null;
}

export function ProgressDisplay({
  events,
  isProcessing,
  error,
}: ProgressDisplayProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events]);

  if (events.length === 0 && !error) {
    return null;
  }

  // Calculate stats from events
  const completionEvents = events.filter(e => e.type === 'complete' && !e.postIndex);
  const latestCompletion = completionEvents[completionEvents.length - 1];
  const successful = latestCompletion?.successful || 0;
  const failed = latestCompletion?.failed || 0;
  const total = successful + failed;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 p-6 bg-slate-900 border-slate-700">
      {/* Progress Header */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Progress</h2>
          {isProcessing && (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm text-blue-400">Processing...</span>
            </div>
          )}
          {!isProcessing && events.length > 0 && (
            <span className="text-sm text-slate-400">
              {successful + failed > 0
                ? `Complete: ${successful} sent, ${failed} failed`
                : 'Idle'}
            </span>
          )}
        </div>

        {/* Progress Bar */}
        {total > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Posts Processed</span>
              <span>
                {successful} / {total}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{
                  width: `${total > 0 ? (successful / total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Status Badges */}
      {total > 0 && (
        <div className="flex gap-2 mb-6">
          <Badge className="bg-green-900 text-green-200">
            Sent: {successful}
          </Badge>
          {failed > 0 && (
            <Badge className="bg-red-900 text-red-200">Failed: {failed}</Badge>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-900/20 border border-red-700 rounded-md">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Event Log */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event, idx) => (
          <EventLogEntry key={idx} event={event} />
        ))}
        <div ref={logEndRef} />
      </div>
    </Card>
  );
}

interface EventLogEntryProps {
  event: StreamEvent;
}

function EventLogEntry({ event }: EventLogEntryProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'crawling':
        return <span className="text-blue-400">🔍</span>;
      case 'generating':
        return <span className="text-yellow-400">⚙️</span>;
      case 'sending':
        return <span className="text-purple-400">📧</span>;
      case 'complete':
        return <span className="text-green-400">✓</span>;
      case 'error':
        return <span className="text-red-400">✕</span>;
      default:
        return <span className="text-slate-400">•</span>;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'crawling':
        return 'text-blue-300';
      case 'generating':
        return 'text-yellow-300';
      case 'sending':
        return 'text-purple-300';
      case 'complete':
        return 'text-green-300';
      case 'error':
        return 'text-red-300';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <div className="flex gap-3 text-sm py-2 px-3 bg-slate-800/50 rounded border border-slate-700/50 hover:bg-slate-800">
      <span className="flex-shrink-0">{getIcon(event.type)}</span>
      <div className="flex-1 space-y-1">
        <p className={`${getColor(event.type)} font-medium`}>
          {event.message ||
            (event.type === 'complete' ? 'Processing complete' : event.type)}
        </p>
        {event.title && (
          <p className="text-xs text-slate-400 truncate">
            Post: {event.title}
          </p>
        )}
        {event.postIndex && (
          <p className="text-xs text-slate-500">Index: {event.postIndex}</p>
        )}
      </div>
    </div>
  );
}
