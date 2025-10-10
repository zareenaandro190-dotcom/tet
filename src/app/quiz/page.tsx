import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateMCQQuizzes } from '@/ai/flows/generate-mcq-quizzes';
import QuizInterface from '@/components/quiz-interface';
import { subjects } from '@/lib/syllabus';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type QuizPageProps = {
  searchParams: {
    subject?: string;
    lesson?: string;
    numQuestions?: string;
  };
};

async function QuizGenerator({ subjectId, lessonId, numQuestions }: { subjectId: string, lessonId: string, numQuestions: number }) {
  const subject = subjects.find((s) => s.id === subjectId);
  const lesson = subject?.lessons.find((l) => l.id === lessonId);

  if (!subject || !lesson) {
    return notFound();
  }

  try {
    const quizData = await generateMCQQuizzes({
      subject: subject.name,
      lesson: lesson.name,
      numQuestions: numQuestions,
    });

    if (!quizData || !quizData.mcqs || quizData.mcqs.length === 0) {
        throw new Error("No MCQs were generated.");
    }
    
    const quiz = {
      subject: subject.name,
      lesson: lesson.name,
      mcqs: quizData.mcqs,
    }

    return <QuizInterface quiz={quiz} />;
  } catch(error) {
    console.error("Failed to generate quiz:", error);
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
                        There was a problem generating the questions for this quiz. Please try a different lesson or check back later.
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
  }
}

function QuizLoadingSkeleton() {
    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-6 w-full" />
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <div className="flex justify-end">
                    <Skeleton className="h-10 w-24" />
                </div>
            </CardContent>
        </Card>
    )
}

export default function QuizPage({ searchParams }: QuizPageProps) {
  const { subject, lesson } = searchParams;
  const numQuestions = parseInt(searchParams.numQuestions || '10', 10);

  if (!subject || !lesson) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
        <Suspense fallback={<QuizLoadingSkeleton />}>
            <QuizGenerator subjectId={subject} lessonId={lesson} numQuestions={numQuestions} />
        </Suspense>
    </div>
  );
}
