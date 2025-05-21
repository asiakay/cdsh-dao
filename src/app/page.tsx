import { mockProposals, mockUser } from '@/lib/mock-data';
import { ProposalCard } from '@/components/dashboard/ProposalCard';
import { VotingPowerIndicator } from '@/components/dashboard/VotingPowerIndicator';
import { DaoActions } from '@/components/dashboard/DaoActions';

export default function DaoDashboardPage() {
  const activeProposals = mockProposals.filter(p => p.status === 'active' || p.status === 'pending');

  return (
    <div className="space-y-8">
      <section aria-labelledby="user-voting-power">
        <h2 id="user-voting-power" className="sr-only">Your Voting Power</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <VotingPowerIndicator user={mockUser} />
            </div>
            <div className="md:col-span-2 flex flex-col justify-center items-start">
                 <DaoActions />
            </div>
        </div>
      </section>

      <section aria-labelledby="active-proposals">
        <h2 id="active-proposals" className="text-2xl font-bold tracking-tight mb-6">
          Active Proposals
        </h2>
        {activeProposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProposals.map(proposal => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">There are no active proposals at the moment.</p>
        )}
      </section>
    </div>
  );
}
