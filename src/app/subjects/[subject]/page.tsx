import Link from 'next/link';
import { notFound } from 'next/navigation';
import { subjects } from '@/lib/syllabus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft } from 'lucide-react';

type SubjectPageProps = {
  params: {
    subject: string;
  };
  searchParams: {
    paper?: string;
    class?: string;
  }
};

export default function SubjectPage({ params, searchParams }: SubjectPageProps) {
  const subject = subjects.find((s) => s.id === params.subject);

  if (!subject) {
    notFound();
  }

  const backLink = searchParams.paper && searchParams.class 
    ? `/subjects?paper=${searchParams.paper}&class=${searchParams.class}`
    : '/subjects';

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-2">
            <Link href={backLink}>
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
            </Link>
            <div className="flex items-center gap-3">
                <subject.icon className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{subject.name}</h1>
            </div>
        </div>
        <p className="text-muted-foreground mt-2 pl-12">Choose a lesson to generate an MCQ quiz.</p>
      </header>

      <div className="space-y-4">
        {subject.lessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-md transition-shadow hover:bg-card/90">
            <CardContent className="p-4 flex items-center justify-between">
              <p className="font-semibold text-lg">{lesson.name}</p>
              <Link href={`/quiz?subject=${subject.id}&lesson=${lesson.id}`}>
                <Button variant='outline' className='border-primary text-primary hover:bg-primary hover:text-primary-foreground'>
                  Start Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return subjects.map((subject) => ({
      subject: subject.id,
    }));
}
