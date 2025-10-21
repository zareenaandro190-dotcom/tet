
'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateMCQQuizzes, checkMCQGeneration, GenerateMCQQuizzesOutput } from '@/ai/flows/generate-mcq-quizzes';
import QuizInterface from '@/components/quiz-interface';
import { subjects } from '@/lib/syllabus';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Operation } from 'genkit';


function QuizGenerator() {
    const searchParams = useSearchParams();
    const subjectId = searchParams.get('subject');
    const lessonId = searchParams.get('lesson');
    const numQuestionsParam = searchParams.get('numQuestions');

    const [quizData, setQuizData] = useState<GenerateMCQQuizzesOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [operation, setOperation] = useState<Operation | null>(null);

    const numQuestions = parseInt(numQuestionsParam || '10', 10);

    useEffect(() => {
        async function startGeneration() {
            if (!subjectId || !lessonId) {
                return;
            }

            const subject = subjects.find((s) => s.id === subjectId);
            const lesson = subject?.lessons.find((l) => l.id === lessonId);

            if (!subject || !lesson) {
                setError("Subject or lesson not found.");
                return;
            }

            try {
                const op = await generateMCQQuizzes({
                    subject: subject.name,
                    lesson: lesson.name,
                    numQuestions: numQuestions,
                });
                setOperation(op);
            } catch (e: any) {
                console.error("Failed to start quiz generation:", e);
                setError(e.message || "An unexpected error occurred while starting quiz generation.");
            }
        }
        startGeneration();
    }, [subjectId, lessonId, numQuestions]);

    useEffect(() => {
        if (!operation?.name) {
            return;
        }

        const poll = setInterval(async () => {
            try {
                const result = await checkMCQGeneration(operation.name);
                if (result.done) {
                    if (!result.result || !result.result.mcqs || result.result.mcqs.length === 0) {
                       throw new Error("No MCQs were generated.");
                    }
                    setQuizData(result.result);
                    clearInterval(poll);
                }
            } catch (e: any) {
                console.error("Failed to check generation status:", e);
                setError(e.message || "An error occurred while fetching quiz questions.");
                clearInterval(poll);
            }
        }, 2000); // Poll every 2 seconds

        return () => clearInterval(poll);
    }, [operation]);

    if (error) {
        return (
            <Card className="max-w-4xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                    <CardDescription>We couldn't generate the quiz.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Generation Failed</AlertTitle>
                        <AlertDescription>
                            {error} Please try a different lesson or check back later.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }
    
    if (!subjectId || !lessonId) {
        return notFound();
    }

    if (!quizData) {
         const subject = subjects.find((s) => s.id === subjectId);
         const lesson = subject?.lessons.find((l) => l.id === lessonId);
        return <QuizLoadingSkeleton subject={subject?.name} lesson={lesson?.name} />;
    }

    const subject = subjects.find((s) => s.id === subjectId);
    const lesson = subject?.lessons.find((l) => l.id === lessonId);

    const quiz = {
        subject: subject!.name,
        lesson: lesson!.name,
        mcqs: quizData.mcqs,
    };

    return <QuizInterface quiz={quiz} />;
}

function QuizLoadingSkeleton({subject, lesson}: {subject?: string, lesson?: string}) {
    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                 {subject && lesson ? (
                    <>
                       <CardTitle className="font-headline text-2xl">{subject}</CardTitle>
                       <CardDescription>Lesson: {lesson}</CardDescription>
                    </>
                ) : (
                    <>
                        <Skeleton className="h-8 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </>
                )}
            </CardHeader>
            <CardContent className="space-y-6 text-center flex flex-col items-center justify-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="font-semibold text-lg">Generating your quiz...</p>
                <p className="text-muted-foreground">This may take a moment. The AI is crafting questions just for you!</p>
            </CardContent>
        </Card>
    )
}

export default function QuizPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
        <Suspense fallback={<QuizLoadingSkeleton />}>
            <QuizGenerator />
        </Suspense>
    </div>
  );
}
