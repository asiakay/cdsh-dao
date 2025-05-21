"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DaoActions() {
  const { toast } = useToast();

  const handleNewProposal = () => {
    toast({
      title: "Feature Not Implemented",
      description: "Creating new proposals will be available in a future version.",
    });
  };

  const handleDelegateVotes = () => {
    toast({
      title: "Feature Not Implemented",
      description: "Delegating votes will be available in a future version.",
    });
  };

  return (
    <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
      <Button
        onClick={handleNewProposal}
        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        New Proposal
      </Button>
      <Button
        onClick={handleDelegateVotes}
        variant="outline"
        className="w-full md:w-auto"
        size="lg"
      >
        <Users className="mr-2 h-5 w-5" />
        Delegate Votes
      </Button>
    </div>
  );
}
