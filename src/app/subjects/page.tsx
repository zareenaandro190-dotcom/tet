import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { subjects } from '@/lib/syllabus';

export default function SubjectsPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Subjects</h1>
        <p className="text-muted-foreground mt-2">Choose a subject to start practicing.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <Link href={`/subjects/${subject.id}`} key={subject.id} className="group">
            <Card className="h-full hover:bg-card/80 hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <subject.icon className="h-8 w-8 text-accent" />
                <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
