'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export interface StreamEvent {
  type: 'crawling' | 'generating' | 'sending' | 'complete' | 'error';
  message?: string;
  postIndex?: number;
  title?: string;
  email?: string;
  successful?: number;
  failed?: number;
}

export interface UseProgressStreamResult {
  events: StreamEvent[];
  isProcessing: boolean;
  error: string | null;
  startProcessing: (blogUrl: string, kindleEmail: string, postLimit?: number) => void;
  reset: () => void;
}

export function useProgressStream(): UseProgressStreamResult {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const startProcessing = useCallback(
    (blogUrl: string, kindleEmail: string, postLimit?: number) => {
      // Reset state
      setEvents([]);
      setError(null);
      setIsProcessing(true);

      // Close any existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      // Create new event source
      try {
        const params = new URLSearchParams({
          blogUrl,
          kindleEmail,
          ...(postLimit && { postLimit: postLimit.toString() }),
        });

        // Make POST request with URL params
        fetch('/api/process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            blogUrl,
            kindleEmail,
            postLimit,
          }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Read streaming response
            const reader = response.body?.getReader();
            if (!reader) {
              throw new Error('No response body');
            }

            const decoder = new TextDecoder();
            let buffer = '';

            const processChunk = () => {
              reader.read().then(({ done, value }) => {
                if (done) {
                  setIsProcessing(false);
                  return;
                }

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                // Process complete lines
                for (let i = 0; i < lines.length - 1; i++) {
                  const line = lines[i];

                  if (line.startsWith('data: ')) {
                    try {
                      const event = JSON.parse(line.slice(6)) as StreamEvent;
                      setEvents(prev => [...prev, event]);

                      if (event.type === 'complete' && !event.postIndex) {
                        setIsProcessing(false);
                      }
                    } catch (e) {
                      console.error('Failed to parse event:', line, e);
                    }
                  }
                }

                // Keep incomplete line in buffer
                buffer = lines[lines.length - 1];
                processChunk();
              });
            };

            processChunk();
          })
          .catch(err => {
            console.error('Stream error:', err);
            setError(err instanceof Error ? err.message : 'Stream error occurred');
            setIsProcessing(false);
          });
      } catch (err) {
        console.error('Setup error:', err);
        setError(err instanceof Error ? err.message : 'Failed to start processing');
        setIsProcessing(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setEvents([]);
    setError(null);
    setIsProcessing(false);
  }, []);

  return {
    events,
    isProcessing,
    error,
    startProcessing,
    reset,
  };
}
