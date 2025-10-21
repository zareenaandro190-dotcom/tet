import { config } from 'dotenv';
config();

import { ai } from '@/ai/genkit';
import { checkMCQGeneration, generateMCQQuizzes } from '@/ai/flows/generate-mcq-quizzes';
ai.flow('checkMCQGeneration', checkMCQGeneration);
ai.flow('generateMCQQuizzes', generateMCQQuizzes);


import '@/ai/flows/explain-answer.ts';
import '@/ai/flows/chat-with-edubot.ts';
