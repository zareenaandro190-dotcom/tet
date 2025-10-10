import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookMarked, Target, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const practiceImage = PlaceHolderImages.find(p => p.id === 'practice-start');
  const subjectsImage = PlaceHolderImages.find(p => p.id === 'subjects-list');
  const progressImage = PlaceHolderImages.find(p => p.id === 'progress-tracking');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Welcome to TET Master</h1>
          <p className="text-muted-foreground mt-2">Your partner in acing the Telangana TET & DSC exams.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            {practiceImage && (
              <Image
                src={practiceImage.imageUrl}
                alt={practiceImage.description}
                width={600}
                height={400}
                data-ai-hint={practiceImage.imageHint}
                className="rounded-t-lg object-cover w-full h-48"
              />
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-accent" />
                <span>Start Practice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">Jump right into a random quiz or pick up where you left off.</p>
            </CardContent>
            <div className="p-6 pt-0">
               <Link href="/subjects">
                <Button className="w-full">
                  Take a Quiz <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            {subjectsImage && (
              <Image
                src={subjectsImage.imageUrl}
                alt={subjectsImage.description}
                width={600}
                height={400}
                data-ai-hint={subjectsImage.imageHint}
                className="rounded-t-lg object-cover w-full h-48"
              />
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="text-accent" />
                <span>Browse Subjects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">Explore all subjects and lessons based on the latest TET syllabus.</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/subjects">
                <Button variant="outline" className="w-full">
                  View Subjects <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            {progressImage && (
              <Image
                src={progressImage.imageUrl}
                alt={progressImage.description}
                width={600}
                height={400}
                data-ai-hint={progressImage.imageHint}
                className="rounded-t-lg object-cover w-full h-48"
              />
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-accent" />
                <span>My Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">Track your performance, view accuracy, and identify weak areas.</p>
            </CardContent>
            <div className="p-6 pt-0">
               <Link href="/progress">
                <Button variant="outline" className="w-full">
                  Check Progress <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
