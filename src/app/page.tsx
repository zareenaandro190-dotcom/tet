import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, GraduationCap, Target, Bot, Newspaper, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { href: '/subjects?exam=tet', label: 'TET', icon: GraduationCap, description: 'Syllabus, MCQs, and notes for Teacher Eligibility Test.' },
  { href: '/subjects?exam=dsc', label: 'DSC', icon: Target, description: 'Practice tests and materials for District Selection Committee.' },
  { href: '/subjects?exam=deecet', label: 'DEECET', icon: BookOpen, description: 'Resources for Diploma in Elementary Education Common Entrance Test.' },
  { href: '/ebooks', label: 'E-Books', icon: BookOpen, description: 'Access SCERT textbooks and D.Ed/B.Ed materials.' },
  { href: '/chatbot', label: 'AI Chatbot', icon: Bot, description: 'Ask "EduBot" to clarify concepts and generate MCQs.' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary" style={{ textShadow: '0 0 10px hsl(var(--primary))' }}>
            EduSpark TET & DSC Hub
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            A One-stop Learning & Preparation Hub
          </p>
        </header>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for topics, eBooks, lessons..."
              className="pl-10 text-base"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-12">
          {quickLinks.map((link) => (
            <Link href={link.href} key={link.href} className="group">
              <Card className="bg-card/80 border-primary/20 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <link.icon className="text-primary h-7 w-7" />
                    <span className='text-2xl font-headline'>{link.label}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Newspaper className="h-6 w-6 text-primary" />
              Today's Update
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg hover:bg-muted/30">
              <h3 className="font-semibold text-lg">DSC 2024 Notification Released!</h3>
              <p className="text-muted-foreground text-sm">Application window opens from Oct 28 to Nov 15. Click to view details.</p>
              <span className="text-xs text-primary font-medium">EXAM UPDATE</span>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/30">
              <h3 className="font-semibold text-lg">New: Child Development Chapter 5 MCQs</h3>
              <p className="text-muted-foreground text-sm">50 new practice questions on "Piaget's Cognitive Development" have been added.</p>
              <span className="text-xs text-primary font-medium">NEW MATERIAL</span>
            </div>
             <div className="p-4 border rounded-lg hover:bg-muted/30">
              <h3 className="font-semibold text-lg">Study Tip of the Day</h3>
              <p className="text-muted-foreground text-sm">Use the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break to maximize retention.</p>
              <span className="text-xs text-primary font-medium">TIP</span>
            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
