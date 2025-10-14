import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, GraduationCap, Puzzle, Newspaper, BrainCircuit } from 'lucide-react';
import { papers } from '@/lib/syllabus';

export default function Home() {

  const mainButtons = papers.map(paper => {
      const paperMap = {
          'paper-1': Book,
          'paper-2': GraduationCap,
          'dsc': Puzzle,
          'gk-ca': Newspaper,
          'methodology': BrainCircuit,
      };
      const Icon = paperMap[paper.id as keyof typeof paperMap] || Book;
      return {...paper, icon: Icon};
  });

  const classes = Array.from({ length: 10 }, (_, i) => ({ id: `class-${i + 1}`, name: `Class ${i + 1}` }));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary animate-pulse" style={{
              textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--secondary))'
          }}>
            TET & DSC Master
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Learn Smart, Practice Daily, Crack TET & DSC Easily
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-12">
          {mainButtons.slice(0, 3).map((paper) => (
            <Link href={`/subjects?paper=${paper.id}`} key={paper.id} className="group">
              <Card className="bg-card/80 border-secondary/30 hover:border-secondary hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <paper.icon className="text-secondary h-7 w-7" />
                    <span className='text-2xl font-headline'>{paper.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{paper.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto mb-16">
            {mainButtons.slice(3).map((paper) => (
                <Link href={`/subjects?paper=${paper.id}`} key={paper.id} className="group">
                    <Card className="bg-card/80 border-primary/30 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 h-full">
                        <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <paper.icon className="text-primary h-7 w-7" />
                            <span className='text-2xl font-headline'>{paper.name}</span>
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{paper.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
        
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold font-headline text-center mb-6">Classwise Practice (1 to 10)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {classes.map((classItem) => (
                    <Link href={`/subjects?class=${classItem.id}`} key={classItem.id} className="group">
                        <Card className="h-full hover:bg-primary/10 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <CardContent className="flex items-center justify-center p-6">
                                <CardTitle className="text-xl font-semibold text-center">{classItem.name}</CardTitle>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
