"use client"; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Oops, something went wrong!</h2>
      <p className="text-muted-foreground mb-6">
        We encountered an error trying to load this proposal. Please try again.
      </p>
      <p className="text-xs text-muted-foreground mb-6">
        Error: {error.message}
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        variant="default"
        size="lg"
      >
        Try Again
      </Button>
    </div>
  );
}
