import { type GenerateMCQQuizzesOutput } from '@/ai/flows/generate-mcq-quizzes';
import { type LucideIcon } from 'lucide-react';

export type Paper = {
  id: string;
  name: string;
  description: string;
  classes: Class[];
}

export type Class = {
  id: string;
  name: string;
}

export type Subject = {
  id: string;
  name: string;
  icon: LucideIcon;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  name:string;
};

export type MCQ = GenerateMCQQuizzesOutput['mcqs'][0];

export type Quiz = {
  subject: string;
  lesson: string;
  mcqs: MCQ[];
};

export type UserAnswer = {
  questionIndex: number;
  selectedOption: string;
  isCorrect: boolean;
};

export type QuizResult = {
  subject: string;
  lesson: string;
  mcqs: MCQ[];
  userAnswers: UserAnswer[];
  score: number;
  accuracy: number;
  timeSpent: number; // in seconds
};
