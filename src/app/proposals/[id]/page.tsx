"use client"; // This page uses client-side hooks for state and interactions

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getProposalById, mockUser } from '@/lib/mock-data'; // Assuming mockUser is also needed here or passed differently
import type { Proposal, User, VoteOption } from '@/types';

import { ProposalInfo } from '@/components/proposal/ProposalInfo';
import { AiSummary } from '@/components/proposal/AiSummary';
import { DiscussionSimulator } from '@/components/proposal/DiscussionSimulator';
import { VotingSection } from '@/components/proposal/VotingSection';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

export default function ProposalDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [user, setUser] = useState<User>(mockUser); // Manage user state, potentially updated after voting
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const fetchedProposal = getProposalById(id);
        if (fetchedProposal) {
          setProposal(fetchedProposal);
        } else {
          notFound(); // Or handle error appropriately
        }
        setIsLoading(false);
      }, 500); // Simulate network delay
    } else {
      notFound();
    }
  }, [id]);

  const handleVoteCasted = (proposalId: string, vote: VoteOption, tokens: number) => {
    // This is where you would normally update backend and re-fetch data.
    // For this simulation, we can update the local proposal state and user tokens.
    if (proposal && proposal.id === proposalId) {
      setProposal(prevProposal => {
        if (!prevProposal) return null;
        const newVotes = { ...prevProposal.votes };
        newVotes[vote] = (newVotes[vote] || 0) + tokens; // Add tokens, not just +1 vote
        return { ...prevProposal, votes: newVotes };
      });
      setUser(prevUser => ({
        ...prevUser,
        tokens: prevUser.tokens - tokens,
      }));
    }
  };

  if (isLoading) {
    return <ProposalDetailLoadingSkeleton />;
  }

  if (!proposal) {
    // This case should ideally be handled by notFound() in useEffect,
    // but as a fallback or if loading fails gracefully.
    return <div className="text-center py-10">Proposal not found.</div>;
  }
  
  return (
    <div className="space-y-8">
      <ProposalInfo proposal={proposal} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AiSummary proposal={proposal} />
          <DiscussionSimulator simulatedThread={proposal.discussionThreadSimulated} />
        </div>
        <div className="lg:col-span-1">
          <VotingSection proposal={proposal} user={user} onVoteCasted={handleVoteCasted} />
        </div>
      </div>
    </div>
  );
}

function ProposalDetailLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Skeleton for ProposalInfo */}
      <div className="space-y-4 p-6 border rounded-lg">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Skeleton for AiSummary */}
          <div className="space-y-3 p-6 border rounded-lg">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          {/* Skeleton for DiscussionSimulator */}
          <div className="space-y-3 p-6 border rounded-lg">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-40 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-10 flex-grow" />
                <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          {/* Skeleton for VotingSection */}
          <div className="space-y-3 p-6 border rounded-lg">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

