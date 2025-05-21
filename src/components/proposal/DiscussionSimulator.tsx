import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';

interface DiscussionSimulatorProps {
  simulatedThread: string;
}

export function DiscussionSimulator({ simulatedThread }: DiscussionSimulatorProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <MessageSquare className="mr-2 h-6 w-6 text-primary" />
          Discussion Forum
        </CardTitle>
        <CardDescription>Simulated community discussion on this proposal.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto rounded-md border bg-muted/50 p-4 mb-4 whitespace-pre-line text-sm leading-relaxed">
          {simulatedThread || "No discussion yet."}
        </div>
        <div className="flex gap-2">
          <Textarea placeholder="Type your comment... (simulation only)" className="flex-grow" />
          <Button variant="outline" size="icon" aria-label="Send comment (simulated)">
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Note: This is a simulated discussion forum. Comments are not saved.
        </p>
      </CardContent>
    </Card>
  );
}
