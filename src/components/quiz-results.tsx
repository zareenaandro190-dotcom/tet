'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowLeft, Check, Clock, Home, Percent, Repeat, X } from 'lucide-react';
import type { QuizResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function QuizResults() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResult | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      // Ensure timestamp exists for older results
      if (!parsedResults.timestamp) {
        parsedResults.timestamp = Date.now();
      }
      setResults(parsedResults);
    } else {
      router.replace('/');
    }
  }, [router]);

  if (!results) {
    return (
        <div className="text-center p-8">
            <p>Loading results...</p>
        </div>
    );
  }

  const { subject, lesson, mcqs, userAnswers, score, timeSpent } = results;

  const chartData = [
    { name: 'Correct', value: userAnswers.filter(a => a.isCorrect).length, fill: 'hsl(var(--primary))' },
    { name: 'Incorrect', value: userAnswers.filter(a => !a.isCorrect).length, fill: 'hsl(var(--destructive))' },
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getSubjectId = (subjectName: string) => subjectName.toLowerCase().replace(/\s+/g, '-');
  const getLessonId = (lessonName: string) => lessonName.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Quiz Results</CardTitle>
          <CardDescription>
            Subject: {subject} | Lesson: {lesson}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-8 text-center">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-lg"><Percent /> Score</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">{score}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-lg"><Check /> Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{userAnswers.filter(a => a.isCorrect).length}/{mcqs.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-lg"><Clock /> Time Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{formatTime(timeSpent)}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} />
                    <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Review Answers</h3>
            <Accordion type="single" collapsible className="w-full">
              {mcqs.map((mcq, index) => {
                const userAnswer = userAnswers.find(ua => ua.questionIndex === index);
                const isCorrect = userAnswer?.isCorrect;
                const questionContent = mcq.language_versions.english; // Default to English
                return (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className={cn(
                        "text-left",
                        isCorrect === true && "text-green-600 dark:text-green-400",
                        isCorrect === false && "text-red-600 dark:text-red-400"
                    )}>
                        <div className="flex items-center gap-2">
                            {isCorrect === true && <Check className="h-5 w-5" />}
                            {isCorrect === false && <X className="h-5 w-5" />}
                            <span>Q{index + 1}: {questionContent.question}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-8">
                        {questionContent.options.map(opt => {
                            const isUserAnswer = userAnswer?.selectedOption === opt;
                            const isCorrectAnswer = questionContent.correct_answer === opt;
                            return (
                                <p key={opt} className={cn(
                                    "p-2 rounded-md",
                                    isCorrectAnswer && "bg-green-100 dark:bg-green-900/30 font-semibold",
                                    isUserAnswer && !isCorrectAnswer && "bg-red-100 dark:bg-red-900/30"
                                )}>
                                    {opt}
                                </p>
                            )
                        })}
                      </div>
                      <Alert className="mt-4 ml-8">
                          <AlertTitle>Explanation</AlertTitle>
                          <AlertDescription>{questionContent.explanation}</AlertDescription>
                      </Alert>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/quiz?subject=${getSubjectId(results.subject)}&lesson=${getLessonId(results.lesson)}`}>
                <Button variant="outline"><Repeat className="mr-2 h-4 w-4" /> Try Again</Button>
            </Link>
            <Link href="/subjects">
                <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Choose Another Lesson</Button>
            </Link>
            <Link href="/">
                <Button><Home className="mr-2 h-4 w-4" /> Back to Home</Button>
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
