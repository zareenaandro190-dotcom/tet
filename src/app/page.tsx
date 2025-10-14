import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, GraduationCap } from 'lucide-react';
import { subjects, papers } from '@/lib/syllabus';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary animate-pulse">TET Master</h1>
          <p className="text-muted-foreground mt-2 text-lg">Learn Smart, Practice Daily, Crack TET Easily</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-12">
            {papers.map((paper) => (
                <Card key={paper.id} className="bg-card/80 border-secondary/50 hover:border-secondary hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {paper.id === 'paper-1' ? <Book className="text-secondary" /> : <GraduationCap className="text-secondary" />}
                            <span className='text-2xl'>{paper.name}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{paper.description}</p>
                        <Link href={`/classes?paper=${paper.id}`}>
                            <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                                View Classes <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
        
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Start Practicing by Subject</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {subjects.map((subject) => (
                    <Link href={`/subjects/${subject.id}`} key={subject.id} className="group">
                        <Card className="h-full hover:bg-primary/10 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <CardHeader className="flex flex-col items-center justify-center text-center gap-3 p-4">
                                <subject.icon className="h-10 w-10 text-primary" />
                                <CardTitle className="text-base font-semibold">{subject.name}</CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
