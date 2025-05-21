
export interface Proposal {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // For more detailed view
  budgetImpact: number;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  status: 'active' | 'passed' | 'failed' | 'pending';
  deadline: string; // ISO string date
  proposer: string; // User ID or name
  discussionThreadSimulated: string; // Simulated discussion content
}

export interface User {
  id: string;
  tokens: number;
  delegatedTo: string | null;
  name: string;
  avatarUrl?: string;
}

export type VoteOption = 'yes' | 'no' | 'abstain';
