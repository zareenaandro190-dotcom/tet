import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { papers } from '@/lib/syllabus';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, Book, GraduationCap } from 'lucide-react';

type ClassesPageProps = {
    searchParams: {
        paper?: string;
    };
};

export default function ClassesPage({ searchParams }: ClassesPageProps) {
    const paperId = searchParams.paper;
    if (!paperId) {
        redirect('/');
    }

    const paper = papers.find((p) => p.id === paperId);

    if (!paper) {
        notFound();
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <header className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back to Home</span>
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        {paper.id === 'paper-1' ? <Book className="h-8 w-8 text-secondary" /> : <GraduationCap className="h-8 w-8 text-secondary" />}
                        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{paper.name}</h1>
                    </div>
                </div>
                <p className="text-muted-foreground mt-2 pl-12">Choose a class to see the available subjects.</p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {paper.classes.map((classItem) => (
                    <Link href={`/subjects?paper=${paper.id}&class=${classItem.id}`} key={classItem.id} className="group">
                        <Card className="h-full flex items-center justify-center p-6 hover:bg-primary/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <CardTitle className="text-xl font-semibold text-center">{classItem.name}</CardTitle>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
