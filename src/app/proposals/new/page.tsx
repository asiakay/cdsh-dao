
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";

const proposalFormSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }).max(100, {
    message: "Title must not be longer than 100 characters.",
  }),
  description: z.string().min(20, {
    message: "Short description must be at least 20 characters.",
  }).max(200, {
    message: "Short description must not be longer than 200 characters.",
  }),
  longDescription: z.string().min(50, {
    message: "Detailed description must be at least 50 characters.",
  }).optional(),
  budgetImpact: z.coerce.number().positive({
    message: "Budget impact must be a positive number.",
  }),
});

type ProposalFormValues = z.infer<typeof proposalFormSchema>;

// Default values for the form
const defaultValues: Partial<ProposalFormValues> = {
  title: "",
  description: "",
  longDescription: "",
  budgetImpact: 0,
};

export default function NewProposalPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProposalFormValues) {
    // In a real app, you'd send this data to your backend.
    // For this prototype, we'll just show a toast and redirect.
    console.log("New Proposal Data:", data);
    toast({
      title: "Proposal Submitted (Simulated)",
      description: `Your proposal "${data.title}" has been created. It will appear on the dashboard once processed.`,
      variant: "default",
    });
    router.push("/"); // Redirect to dashboard
  }

  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Proposals
      </Button>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Proposal</CardTitle>
          <CardDescription>Fill out the details below to submit your proposal to the DAO.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Fund research for..." {...field} />
                    </FormControl>
                    <FormDescription>
                      A concise and descriptive title for your proposal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly summarize your proposal (max 200 characters)..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short summary that will be visible on the proposal cards.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a full explanation of your proposal, including objectives, methodology, and expected outcomes..."
                        className="min-h-[150px]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      A comprehensive description of the proposal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budgetImpact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Impact (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="E.g., 5000" {...field} />
                    </FormControl>
                    <FormDescription>
                      The estimated financial impact of this proposal in USD.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit Proposal"}
                {!form.formState.isSubmitting && <Send className="ml-2 h-5 w-5" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
