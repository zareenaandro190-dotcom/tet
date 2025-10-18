'use server';

/**
 * @fileOverview A conversational AI agent called EduBot.
 *
 * - chatWithEduBot - A function that handles conversational chat.
 * - ChatWithEduBotInput - The input type for the chat function.
 * - ChatWithEduBotOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithEduBotInputSchema = z.object({
  history: z.string().optional().describe('The chat history so far.'),
  question: z.string().describe("The user's latest question."),
});
export type ChatWithEduBotInput = z.infer<typeof ChatWithEduBotInputSchema>;

const ChatWithEduBotOutputSchema = z.object({
  reply: z.string().describe("The AI's response to the user's question."),
});
export type ChatWithEduBotOutput = z.infer<typeof ChatWithEduBotOutputSchema>;

export async function chatWithEduBot(input: ChatWithEduBotInput): Promise<ChatWithEduBotOutput> {
  return chatWithEduBotFlow(input);
}

const chatWithEduBotFlow = ai.defineFlow(
  {
    name: 'chatWithEduBotFlow',
    inputSchema: ChatWithEduBotInputSchema,
    outputSchema: ChatWithEduBotOutputSchema,
  },
  async input => {
    let promptText = `You are EduBot, an expert AI assistant for students preparing for teacher eligibility exams in India (like TET, DSC). Your goal is to be helpful, encouraging, and knowledgeable.

Your knowledge base is the syllabus for TET, DSC, SGT, and SA exams in Telangana and Andhra Pradesh.`;

    if (input.history && input.history.trim() !== '') {
      promptText += `

Here is the conversation history:
${input.history}`;
    }

    promptText += `

Here is the user's new question:
"${input.question}"

Your task is to provide a clear, concise, and helpful answer to the user's question. If you don't know the answer, say so politely.`;

    const { output } = await ai.generate({
      prompt: promptText,
      output: { schema: ChatWithEduBotOutputSchema },
    });

    return output!;
  }
);
