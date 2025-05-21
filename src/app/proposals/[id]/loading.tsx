import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Skeleton for ProposalInfo */}
      <div className="space-y-4 p-6 border rounded-lg bg-card">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
        </div>
         <div className="mt-6 space-y-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Skeleton for AiSummary */}
          <div className="space-y-3 p-6 border rounded-lg bg-card">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          {/* Skeleton for DiscussionSimulator */}
          <div className="space-y-3 p-6 border rounded-lg bg-card">
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
          <div className="space-y-3 p-6 border rounded-lg bg-card">
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
