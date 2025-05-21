// SummarizeProposal.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing the pros and cons of a proposal.
 *
 * - summarizeProposal - A function that takes a proposal description and discussion thread as input and returns a summary of its pros and cons.
 * - SummarizeProposalInput - The input type for the summarizeProposal function.
 * - SummarizeProposalOutput - The return type for the summarizeProposal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProposalInputSchema = z.object({
  description: z.string().describe('The description of the proposal.'),
  discussionThread: z.string().describe('The discussion thread of the proposal.'),
});
export type SummarizeProposalInput = z.infer<typeof SummarizeProposalInputSchema>;

const SummarizeProposalOutputSchema = z.object({
  summary: z.string().describe('A summary of the pros and cons of the proposal.'),
});
export type SummarizeProposalOutput = z.infer<typeof SummarizeProposalOutputSchema>;

export async function summarizeProposal(input: SummarizeProposalInput): Promise<SummarizeProposalOutput> {
  return summarizeProposalFlow(input);
}

const summarizeProposalPrompt = ai.definePrompt({
  name: 'summarizeProposalPrompt',
  input: {schema: SummarizeProposalInputSchema},
  output: {schema: SummarizeProposalOutputSchema},
  prompt: `You are an expert in DAO governance. Please provide a concise summary of the pros and cons of the following proposal, using the description and discussion thread as context.\n\nDescription: {{{description}}}\n\nDiscussion Thread: {{{discussionThread}}}\n\nSummary:`,
});

const summarizeProposalFlow = ai.defineFlow(
  {
    name: 'summarizeProposalFlow',
    inputSchema: SummarizeProposalInputSchema,
    outputSchema: SummarizeProposalOutputSchema,
  },
  async input => {
    const {output} = await summarizeProposalPrompt(input);
    return output!;
  }
);
