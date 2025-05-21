import type { Proposal } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, DollarSign, UserCircle, BarChartHorizontalBig } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ProposalInfoProps {
  proposal: Proposal;
}

const getStatusVariant = (status: Proposal['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'active': return 'default';
    case 'passed': return 'secondary';
    case 'failed': return 'destructive';
    case 'pending': return 'outline';
    default: return 'outline';
  }
}

export function ProposalInfo({ proposal }: ProposalInfoProps) {
  const formattedDeadline = format(parseISO(proposal.deadline), "MMMM d, yyyy 'at' h:mm a");
  const currentVotesYesPercent = (proposal.votes.yes / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain || 1)) * 100;
  const currentVotesNoPercent = (proposal.votes.no / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain || 1)) * 100;
  const currentVotesAbstainPercent = (proposal.votes.abstain / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain || 1)) * 100;


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
          <CardTitle className="text-2xl font-bold">{proposal.title}</CardTitle>
          <Badge variant={getStatusVariant(proposal.status)} className="capitalize text-sm px-3 py-1">
            {proposal.status}
          </Badge>
        </div>
        <CardDescription className="text-md">{proposal.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                    <UserCircle className="h-5 w-5 mr-2 text-primary" />
                    <span><strong>Proposer:</strong> {proposal.proposer}</span>
                </div>
                <div className="flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                    <span><strong>Deadline:</strong> {formattedDeadline}</span>
                </div>
                <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    <span><strong>Budget Impact:</strong> ${proposal.budgetImpact.toLocaleString()}</span>
                </div>
            </div>
        </div>
        
        {proposal.longDescription && (
             <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Full Description</h3>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{proposal.longDescription}</p>
            </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Current Vote Status</h3>
          <div className="space-y-2">
            <VoteBar label="Yes" value={proposal.votes.yes} percentage={currentVotesYesPercent} color="bg-green-500" />
            <VoteBar label="No" value={proposal.votes.no} percentage={currentVotesNoPercent} color="bg-red-500" />
            <VoteBar label="Abstain" value={proposal.votes.abstain} percentage={currentVotesAbstainPercent} color="bg-gray-400" />
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

interface VoteBarProps {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

function VoteBar({ label, value, percentage, color }: VoteBarProps) {
  return (
    <div className="flex items-center">
      <span className="w-20 text-sm font-medium text-muted-foreground">{label}:</span>
      <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden mr-2 relative border">
        <div 
          className={`${color} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground mix-blend-difference px-2">
           {value.toLocaleString()} votes ({percentage.toFixed(1)}%)
        </span>
      </div>
    </div>
  );
}
