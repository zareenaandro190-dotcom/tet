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
      options: z.array(z.string()).describe('The multiple-choice options.'),
      correct_answer: z.string().describe('The correct answer from the options.'),
      explanation: z.string().describe('Explanation for the correct answer.'),
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

  Your task is to generate {{numQuestions}} MCQs for the subject "{{subject}}" and lesson "{{lesson}}".  Each MCQ should have four options, and a clear explanation for the correct answer.

  Ensure that the questions are relevant to the lesson and are designed to test the understanding of key concepts.

  The output should be a JSON array of MCQs with the following format:
  [
    {
      "question": "The MCQ question text.",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correct_answer": "The correct answer from the options.",
      "explanation": "Explanation for the correct answer."
    },
    ...
  ]
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
