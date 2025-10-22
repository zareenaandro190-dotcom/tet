'use server';

/**
 * @fileOverview Generates multiple-choice questions (MCQs) for a given subject and lesson in multiple languages.
 *
 * - generateMCQQuizzes - A function that generates MCQs.
 * - checkMCQGeneration - A function to poll the status of MCQ generation.
 * - GenerateMCQQuizzesInput - The input type for the generateMCQQuizzes function.
 * - GenerateMCQQuizzesOutput - The return type for the generateMCQQuizzes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMCQQuizzesInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate MCQs.'),
  lesson: z.string().describe('The lesson for which to generate MCQs.'),
  numQuestions: z.number().default(10).describe('The number of MCQs to generate.'),
});
export type GenerateMCQQuizzesInput = z.infer<typeof GenerateMCQQuizzesInputSchema>;

const LanguageVersionSchema = z.object({
  question: z.string().describe('The question text in this language.'),
  options: z.array(z.string()).length(4).describe('The four multiple-choice options in this language.'),
  correct_answer: z.string().describe('The correct answer from the options in this language.'),
  explanation: z.string().describe('A clear explanation for the correct answer in this language.'),
});

const GenerateMCQQuizzesOutputSchema = z.object({
  mcqs: z.array(
    z.object({
      id: z.string().describe('A unique identifier for the question (e.g., "pedagogy-001").'),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the question.'),
      tags: z.array(z.string()).describe('Relevant tags or keywords for the question (e.g., "Piaget", "Cognitive Development").'),
      language_versions: z.object({
        english: LanguageVersionSchema,
        telugu: LanguageVersionSchema,
        urdu: LanguageVersionSchema,
      }).describe('The question and answer content translated into different languages.'),
    })
  ).describe('The generated MCQs.'),
});
export type GenerateMCQQuizzesOutput = z.infer<typeof GenerateMCQQuizzesOutputSchema>;

export async function generateMCQQuizzes(input: GenerateMCQQuizzesInput) {
  // Start the flow but don't wait for it to finish.
  // Return the operation name to the client so it can poll for status.
  const op = await generateMCQQuizzesFlow.run(input);
  return { name: op.name };
}

const generateMCQPrompt = ai.definePrompt({
  name: 'generateMCQPrompt',
  input: {schema: GenerateMCQQuizzesInputSchema},
  output: {schema: GenerateMCQQuizzesOutputSchema},
  prompt: `You are an expert educator creating high-quality, multilingual multiple-choice questions (MCQs) for Indian teacher eligibility exams (TET, DSC).

  Your task is to generate {{numQuestions}} MCQs for the subject "{{subject}}" and lesson "{{lesson}}".

  For EACH question, you must provide the following:
  1. A unique ID for the question.
  2. A difficulty rating ('Easy', 'Medium', or 'Hard').
  3. An array of relevant tags/keywords.
  4. A 'language_versions' object containing the question, four options, the correct answer, and a detailed explanation in THREE languages: English, Telugu, and Urdu.

  It is critical that the meaning of the question, options, answer, and explanation is identical across all three languages. The correct option must correspond to the same concept in each language.

  The output must be a JSON object that strictly follows the specified schema.
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

export async function checkMCQGeneration(operationName: string) {
  const op = await ai.checkOperation<typeof generateMCQQuizzesFlow>(operationName);
  if (!op.done) {
    return { done: false };
  }
  if (op.error) {
    throw op.error;
  }
  return {
    done: true,
    result: op.output,
  };
}
