"use client";

import type { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Coins } from 'lucide-react';

interface VotingPowerIndicatorProps {
  user: User;
  totalTokensInCirculation?: number; // For calculating percentage if needed
}

export function VotingPowerIndicator({ user, totalTokensInCirculation = 10000 }: VotingPowerIndicatorProps) {
  const votingPowerPercentage = totalTokensInCirculation > 0 ? (user.tokens / totalTokensInCirculation) * 100 : 0;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Coins className="mr-2 h-6 w-6 text-primary" />
          Your Voting Power
        </CardTitle>
        <CardDescription>Your current influence in the DAO.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Token Balance</p>
            <p className="text-3xl font-bold text-primary">{user.tokens.toLocaleString()} CDSH</p>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-muted-foreground">Influence</span>
              <span className="font-semibold">{votingPowerPercentage.toFixed(2)}%</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Progress value={votingPowerPercentage} aria-label={`${votingPowerPercentage.toFixed(2)}% voting power`} className="h-3" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Based on {user.tokens.toLocaleString()} tokens out of {totalTokensInCirculation.toLocaleString()} total tokens.</p>
                  <p className="text-xs text-muted-foreground mt-1">Fairness Stat: Gini coefficient placeholder: 0.35</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {user.delegatedTo && (
            <p className="text-sm text-muted-foreground">
              Your voting power is currently delegated to: {user.delegatedTo}.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
