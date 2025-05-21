"use client";

import { useState, useEffect } from 'react';
import type { Proposal, User, VoteOption } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Wallet, CheckCircle, XCircle, Coins } from 'lucide-react'; // Using Wallet as a generic icon

interface WalletModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  proposal: Proposal | null;
  user: User;
  onVoteCasted: (proposalId: string, vote: VoteOption, tokens: number) => void;
}

type ModalStep = 'connect' | 'vote';

export function WalletModal({ isOpen, onOpenChange, proposal, user, onVoteCasted }: WalletModalProps) {
  const [step, setStep] = useState<ModalStep>('connect');
  const [isConnected, setIsConnected] = useState(false);
  const [selectedVoteOption, setSelectedVoteOption] = useState<VoteOption | null>(null);
  const [tokensToAllocate, setTokensToAllocate] = useState<number>(1);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setStep('connect');
      setIsConnected(false);
      setSelectedVoteOption(null);
      setTokensToAllocate(user.tokens > 0 ? 1 : 0);
    }
  }, [isOpen, user.tokens]);

  const handleConnectWallet = (walletName: string) => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setStep('vote');
      toast({
        title: `Connected to ${walletName}`,
        description: 'Wallet connection simulated successfully.',
        variant: 'default',
      });
    }, 500);
  };

  const handleConfirmVote = () => {
    if (!proposal || !selectedVoteOption) {
      toast({ title: 'Error', description: 'Proposal or vote option missing.', variant: 'destructive' });
      return;
    }

    if (tokensToAllocate <= 0) {
      toast({ title: 'Invalid Vote', description: 'You must allocate at least 1 token.', variant: 'destructive' });
      return;
    }
    
    if (tokensToAllocate > user.tokens) {
      toast({
        title: 'Insufficient Tokens',
        description: `You only have ${user.tokens} tokens available.`,
        variant: 'destructive',
        action: <XCircle className="h-5 w-5 text-destructive-foreground" />,
      });
      return;
    }

    // Simulate vote casting
    setTimeout(() => {
      onVoteCasted(proposal.id, selectedVoteOption, tokensToAllocate);
      toast({
        title: 'Vote Recorded!',
        description: `You voted ${selectedVoteOption.toUpperCase()} with ${tokensToAllocate} token(s) on "${proposal.title}".`,
        variant: 'default',
        action: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
      onOpenChange(false); // Close modal
    }, 1000);
  };

  if (!proposal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wallet className="mr-2 h-6 w-6 text-primary" />
            {step === 'connect' ? 'Connect Wallet' : `Vote on: ${proposal.title}`}
          </DialogTitle>
          <DialogDescription>
            {step === 'connect'
              ? 'Choose your preferred wallet to connect and participate in voting.'
              : `You have ${user.tokens} CDSH tokens. Allocate tokens for your vote.`}
          </DialogDescription>
        </DialogHeader>

        {step === 'connect' && (
          <div className="grid gap-4 py-4">
            <Button onClick={() => handleConnectWallet('MetaMask')} variant="outline" size="lg">
              <Coins className="mr-2 h-5 w-5" /> Connect MetaMask (Simulated)
            </Button>
            <Button onClick={() => handleConnectWallet('WalletConnect')} variant="outline" size="lg">
              <Coins className="mr-2 h-5 w-5" /> Connect WalletConnect (Simulated)
            </Button>
          </div>
        )}

        {step === 'vote' && isConnected && (
          <div className="grid gap-6 py-4">
            <div>
              <Label htmlFor="vote-options" className="text-base font-medium">Your Vote</Label>
              <RadioGroup
                id="vote-options"
                onValueChange={(value) => setSelectedVoteOption(value as VoteOption)}
                className="mt-2 grid grid-cols-3 gap-2"
                value={selectedVoteOption || ""}
              >
                {(['yes', 'no', 'abstain'] as VoteOption[]).map(option => (
                  <div key={option}>
                    <RadioGroupItem value={option} id={`vote-${option}`} className="sr-only peer" />
                    <Label
                      htmlFor={`vote-${option}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="token-slider" className="text-base font-medium">
                Allocate Tokens: <span className="font-bold text-primary">{tokensToAllocate}</span>
              </Label>
              <Slider
                id="token-slider"
                min={user.tokens > 0 ? 1 : 0}
                max={user.tokens}
                step={1}
                value={[tokensToAllocate]}
                onValueChange={(value) => setTokensToAllocate(value[0])}
                className="mt-2"
                disabled={user.tokens === 0}
              />
              {user.tokens === 0 && <p className="text-sm text-destructive mt-1">You have no tokens to allocate.</p>}
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {step === 'vote' && isConnected && (
            <Button
              onClick={handleConfirmVote}
              disabled={!selectedVoteOption || tokensToAllocate <= 0 || tokensToAllocate > user.tokens || user.tokens === 0}
            >
              Confirm Vote
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
