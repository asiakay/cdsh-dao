"use client";

import { useEffect, useState } from 'react';
import type { Proposal } from '@/types';
import { summarizeProposal } from '@/ai/flows/summarize-proposal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, AlertCircle } from 'lucide-react';

interface AiSummaryProps {
  proposal: Proposal;
}

export function AiSummary({ proposal }: AiSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!proposal) return;

    const fetchSummary = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await summarizeProposal({
          description: proposal.longDescription || proposal.description,
          discussionThread: proposal.discussionThreadSimulated,
        });
        setSummary(result.summary);
      } catch (e) {
        console.error("Error fetching AI summary:", e);
        setError("Failed to generate summary. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [proposal]);

  return (
    <Card className="shadow-md bg-accent/10">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Lightbulb className="mr-2 h-6 w-6 text-accent" />
          AI-Powered Summary
        </CardTitle>
        <CardDescription>Pros and cons based on proposal details and discussion.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        )}
        {error && (
          <div className="flex items-center text-destructive">
            <AlertCircle className="mr-2 h-5 w-5" />
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && summary && (
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{summary}</p>
        )}
         {!isLoading && !error && !summary && (
          <p className="text-sm text-muted-foreground">No summary available.</p>
        )}
      </CardContent>
    </Card>
  );
}
