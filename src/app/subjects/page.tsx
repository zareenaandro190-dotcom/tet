import Link from 'next/link';
import { subjects as allSubjects, papers } from '@/lib/syllabus';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { notFound, redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import type { Subject } from '@/lib/types';


type SubjectsPageProps = {
    searchParams: {
        paper?: string;
        class?: string;
    };
};

export default function SubjectsPage({ searchParams }: SubjectsPageProps) {
    const { paper: paperId, class: classId } = searchParams;

    if (!paperId && !classId) {
        // If no paper or class is specified, show all subjects as a fallback
        return (
            <div className="p-4 sm:p-6 md:p-8">
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">All Subjects</h1>
                <p className="text-muted-foreground mt-2">Choose a subject to start practicing.</p>
              </header>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {allSubjects.map((subject) => (
                  <Link href={`/subjects/${subject.id}`} key={subject.id} className="group">
                    <Card className="h-full hover:bg-primary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader className="flex flex-col items-center gap-4 text-center p-6">
                        <subject.icon className="h-10 w-10 text-primary" />
                        <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
    }
    
    let paper = null;
    if (paperId) {
        paper = papers.find(p => p.id === paperId);
    }

    let classItem = null;
    if (paper && classId) {
        classItem = paper?.classes.find(c => c.id === classId);
    }

    let availableSubjects: Subject[] = [];
    let title = "Subjects";
    let backLink = "/";

    if (paper) {
        title = paper.name;
        backLink = paper.classes.length > 0 ? `/classes?paper=${paper.id}` : '/';
        if (paper.subjects) {
            availableSubjects = paper.subjects;
        } else {
            // Default subjects for papers 1 & 2 if not specified
             availableSubjects = allSubjects.filter(s => ![ 'gk-ca', 'methodology-ded', 'methodology-bed'].includes(s.id));
        }

        if (classItem) {
            title = `${paper.name} - ${classItem.name}`;
            backLink = `/classes?paper=${paperId}`;
        }
    } else if (classId) {
        // Class-wise practice from home page
        const className = `Class ${classId.split('-')[1]}`;
        title = `${className} Subjects`;
        backLink = '/';
        availableSubjects = allSubjects.filter(s => ![ 'gk-ca', 'methodology-ded', 'methodology-bed'].includes(s.id));
    } else {
        return redirect('/');
    }

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
            <div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{title}</h1>
                <p className="text-muted-foreground mt-1">Choose a subject to start practicing.</p>
            </div>
        </div>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {availableSubjects.map((subject) => (
          <Link href={`/subjects/${subject.id}?paper=${paperId}&class=${classId}`} key={subject.id} className="group">
            <Card className="h-full hover:bg-primary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-col items-center gap-4 text-center p-6">
                <subject.icon className="h-10 w-10 text-primary" />
                <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
