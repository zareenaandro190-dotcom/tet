'use server';

/**
 * @fileOverview An AI agent that explains why an answer to a question is correct.
 *
 * - explainAnswer - A function that explains the correctness of an answer.
 * - ExplainAnswerInput - The input type for the explainAnswer function.
 * - ExplainAnswerOutput - The return type for the explainAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAnswerInputSchema = z.object({
  question: z.string().describe('The question that was asked.'),
  answer: z.string().describe('The correct answer to the question.'),
  explanation: z.string().describe('The original explanation provided.'),
});
export type ExplainAnswerInput = z.infer<typeof ExplainAnswerInputSchema>;

const ExplainAnswerOutputSchema = z.object({
  detailedExplanation: z.string().describe('A detailed explanation of why the answer is correct.'),
});
export type ExplainAnswerOutput = z.infer<typeof ExplainAnswerOutputSchema>;

export async function explainAnswer(input: ExplainAnswerInput): Promise<ExplainAnswerOutput> {
  return explainAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainAnswerPrompt',
  input: {schema: ExplainAnswerInputSchema},
  output: {schema: ExplainAnswerOutputSchema},
  prompt: `You are an expert educator skilled at providing detailed explanations.

  Question: {{{question}}}
  Correct Answer: {{{answer}}}
  Original Explanation: {{{explanation}}}

  Provide a more detailed explanation of why the answer is correct, elaborating on the concepts involved and providing additional context to enhance understanding.`,
});

const explainAnswerFlow = ai.defineFlow(
  {
    name: 'explainAnswerFlow',
    inputSchema: ExplainAnswerInputSchema,
    outputSchema: ExplainAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
