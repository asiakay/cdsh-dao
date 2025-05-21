import Link from 'next/link';
import type { Proposal } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BarChart2, CheckCircle, XCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

interface ProposalCardProps {
  proposal: Proposal;
}

const getStatusIcon = (status: Proposal['status']) => {
  switch (status) {
    case 'active':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'passed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'pending':
      return <HelpCircle className="h-4 w-4 text-blue-500" />;
    default:
      return <HelpCircle className="h-4 w-4" />;
  }
};

const getStatusVariant = (status: Proposal['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'active': return 'default';
    case 'passed': return 'secondary'; // Or a success variant if available
    case 'failed': return 'destructive';
    case 'pending': return 'outline';
    default: return 'outline';
  }
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const timeRemaining = formatDistanceToNowStrict(parseISO(proposal.deadline), { addSuffix: true });
  const totalVotes = proposal.votes.yes + proposal.votes.no + proposal.votes.abstain;

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold leading-tight">{proposal.title}</CardTitle>
          <Badge variant={getStatusVariant(proposal.status)} className="capitalize ml-2 flex items-center gap-1">
            {getStatusIcon(proposal.status)}
            {proposal.status}
          </Badge>
        </div>
        <CardDescription className="text-sm line-clamp-2">{proposal.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            <span>Deadline: {timeRemaining}</span>
          </div>
          <div className="flex items-center">
            <BarChart2 className="mr-1.5 h-3.5 w-3.5" />
            <span>Total Votes: {totalVotes.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/proposals/${proposal.id}`}>View Details & Vote</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
