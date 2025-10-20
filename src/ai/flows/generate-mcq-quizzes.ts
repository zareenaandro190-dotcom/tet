'use server';

/**
 * @fileOverview Generates multiple-choice questions (MCQs) for a given subject and lesson.
 *
 * - generateMCQQuizzes - A function that generates MCQs.
 * - GenerateMCQQuizzesInput - The input type for the generateMCQQuizzes function.
 * - GenerateMCQQuizzesOutput - The return type for the generateMCQQuizzes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMCQQuizzesInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate MCQs.'),
  lesson: z.string().describe('The lesson for which to generate MCQs.'),
  numQuestions: z.number().default(50).describe('The number of MCQs to generate.'),
});
export type GenerateMCQQuizzesInput = z.infer<typeof GenerateMCQQuizzesInputSchema>;

const GenerateMCQQuizzesOutputSchema = z.object({
  mcqs: z.array(
    z.object({
      question: z.string().describe('The MCQ question text.'),
      options: z.array(z.string()).length(4).describe('The four multiple-choice options.'),
      correct_answer: z.string().describe('The correct answer from the options.'),
      explanation: z.string().describe('A clear and concise explanation for why the answer is correct.'),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the question.'),
      tags: z.array(z.string()).describe('Relevant tags or keywords for the question (e.g., "Piaget", "Cognitive Development").'),
    })
  ).describe('The generated MCQs.'),
});
export type GenerateMCQQuizzesOutput = z.infer<typeof GenerateMCQQuizzesOutputSchema>;

export async function generateMCQQuizzes(input: GenerateMCQQuizzesInput): Promise<GenerateMCQQuizzesOutput> {
  return generateMCQQuizzesFlow(input);
}

const generateMCQPrompt = ai.definePrompt({
  name: 'generateMCQPrompt',
  input: {schema: GenerateMCQQuizzesInputSchema},
  output: {schema: GenerateMCQQuizzesOutputSchema},
  prompt: `You are an expert educator specializing in creating high-quality multiple-choice questions (MCQs).

  Your task is to generate {{numQuestions}} MCQs for the subject "{{subject}}" and lesson "{{lesson}}".

  Each MCQ must have:
  1. A clear and unambiguous question.
  2. Exactly four multiple-choice options.
  3. A single correct answer.
  4. A detailed explanation for the correct answer, referencing the core concepts.
  5. A difficulty rating of 'Easy', 'Medium', or 'Hard'.
  6. An array of relevant tags or keywords.

  Ensure that the questions are relevant to the lesson and are designed to test the understanding of key concepts.

  The output should be a JSON array of MCQs.
  `,
});

const generateMCQQuizzesFlow = ai.defineFlow(
  {
    name: 'generateMCQQuizzesFlow',
    inputSchema: GenerateMCQQuizzesInputSchema,
    outputSchema: GenerateMCQQuizzesOutputSchema,
  },
  async input => {
    const {output} = await generateMCQPrompt(input);
    return output!;
  }
);
