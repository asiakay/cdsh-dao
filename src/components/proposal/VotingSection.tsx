
"use client";

import { useState } from 'react';
import type { Proposal, User, VoteOption } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { WalletModal } from '@/components/WalletModal';
import { useToast } from '@/hooks/use-toast';
import { CheckSquare, ExternalLink } from 'lucide-react';

interface VotingSectionProps {
  proposal: Proposal;
  user: User;
  onVoteCasted: (proposalId: string, vote: VoteOption, tokens: number) => void; // To update parent state if needed
}

export function VotingSection({ proposal, user, onVoteCasted }: VotingSectionProps) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(proposal.status === 'active');
  const { toast } = useToast();

  const handleConnectAndVote = () => {
    if (proposal.status !== 'active') {
        toast({
            title: "Voting Closed",
            description: "This proposal is not currently active for voting.",
            variant: "destructive"
        });
        return;
    }
    setIsWalletModalOpen(true);
  };

  const handleSimulateImpact = () => {
    toast({
        title: "Budget Impact Simulation",
        description: `This proposal has a budget impact of $${proposal.budgetImpact.toLocaleString()}. Simulating changes... (Feature not fully implemented).`,
        duration: 5000,
    });
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <CheckSquare className="mr-2 h-6 w-6 text-primary" />
            Cast Your Vote
          </CardTitle>
          <CardDescription>Connect your wallet to participate in the decision-making process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your current token balance: <strong>{user.tokens.toLocaleString()} CDSH</strong>
          </p>
          {proposal.status === 'active' ? (
            <Button onClick={handleConnectAndVote} className="w-full" size="lg">
              Connect Wallet & Vote
            </Button>
          ) : (
            <Button className="w-full" size="lg" disabled>
              Voting Closed
            </Button>
          )}
           <Button onClick={handleSimulateImpact} variant="outline" className="w-full" size="lg">
              <ExternalLink className="mr-2 h-4 w-4" />
              Simulate Budget Impact
            </Button>
        </CardContent>
      </Card>

      <WalletModal
        isOpen={isWalletModalOpen}
        onOpenChange={setIsWalletModalOpen}
        proposal={proposal}
        user={user}
        onVoteCasted={onVoteCasted}
      />
    </>
  );
}
