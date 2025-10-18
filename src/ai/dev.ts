import { config } from 'dotenv';
config();

import '@/ai/flows/generate-mcq-quizzes.ts';
import '@/ai/flows/explain-answer.ts';
import '@/ai/flows/chat-with-edubot.ts';
