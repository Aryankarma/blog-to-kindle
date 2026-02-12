"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StreamEvent } from "@/lib/hooks/use-progress-stream";

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
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  if (events.length === 0 && !error) {
    return null;
  }

  // Calculate stats from events
  const completionEvents = events.filter(
    (e) => e.type === "complete" && !e.postIndex,
  );
  const latestCompletion = completionEvents[completionEvents.length - 1];
  const successful = latestCompletion?.successful || 0;
  const failed = latestCompletion?.failed || 0;
  const total = successful + failed;

  return (
    <div className="relative mx-auto w-full max-w-2xl mt-12 mb-20">
      {/* Shadow under the card */}
      <div className="absolute -bottom-4 left-4 right-4 h-20 rounded-3xl bg-ink/5 blur-2xl" />

      <Card className="relative overflow-hidden rounded-2xl border border-[#e0e0e0] bg-[#ffffff] p-8 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
        {/* Progress Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-semibold tracking-tight text-ink">
              Processing Status
            </h2>
            {isProcessing && (
              <div className="flex items-center gap-2 rounded-full bg-cream/50 px-3 py-1">
                <div className="h-1.5 w-1.5 bg-ink rounded-full animate-pulse" />
                <span className="text-[12px] font-medium text-ink uppercase tracking-wider">
                  Active
                </span>
              </div>
            )}
            {!isProcessing && events.length > 0 && (
              <span className="text-[13px] font-medium text-stone">
                {successful + failed > 0
                  ? `Complete • ${successful} sent`
                  : "Ready"}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {total > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between text-[12px] font-medium text-stone uppercase tracking-wider">
                <span>Article Delivery</span>
                <span className="font-mono text-ink">
                  {successful} / {total}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-cream">
                <div
                  className="h-full rounded-full bg-ink transition-all duration-500 ease-[0.16,1,0.3,1]"
                  style={{
                    width: `${total > 0 ? (successful / total) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 rounded-xl bg-red-50 border border-red-100 p-4">
            <div className="flex items-start gap-3">
              <span className="text-red-500 mt-0.5">✕</span>
              <p className="text-[14px] text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Event Log */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {events.map((event, idx) => (
            <EventLogEntry key={idx} event={event} />
          ))}
          <div ref={logEndRef} />
        </div>
      </Card>
    </div>
  );
}

interface EventLogEntryProps {
  event: StreamEvent;
}

function EventLogEntry({ event }: EventLogEntryProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "crawling":
        return <div className="h-2 w-2 rounded-full bg-sky-400" />;
      case "generating":
        return <div className="h-2 w-2 rounded-full bg-amber-400" />;
      case "sending":
        return <div className="h-2 w-2 rounded-full bg-purple-400" />;
      case "complete":
        return (
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-ink">
            <svg
              className="h-2.5 w-2.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case "error":
        return <div className="h-2 w-2 rounded-full bg-red-500" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-stone" />;
    }
  };

  const isMainEvent = event.type === "complete" || event.type === "error";

  return (
    <div
      className={`flex items-start gap-4 rounded-xl border border-transparent px-4 py-3 transition-colors hover:bg-cream/30 ${isMainEvent ? "bg-cream/20" : ""}`}
    >
      <div className="mt-1.5 flex h-4 w-4 items-center justify-center">
        {getIcon(event.type)}
      </div>
      <div className="flex-1 space-y-1">
        <p
          className={`text-[14px] font-medium leading-tight ${event.type === "error" ? "text-red-600" : "text-ink"}`}
        >
          {event.message ||
            (event.type === "complete"
              ? "Conversion finished successfully"
              : event.type)}
        </p>

        {(event.title ||
          (event.type === "complete" && event.successful !== undefined)) && (
          <div className="flex items-center gap-2">
            {event.title && (
              <p className="font-mono text-[11px] text-stone truncate max-w-[240px]">
                {event.title}
              </p>
            )}
            {event.type === "complete" && event.successful !== undefined && (
              <span className="font-mono text-[11px] font-semibold text-ink">
                {event.successful} POSTS DELIVERED
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
