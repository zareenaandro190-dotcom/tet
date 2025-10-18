import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, GraduationCap, Target, Bot, Newspaper, Search, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { href: '/classes?paper=tet-paper-1', label: 'TET Paper 1', icon: GraduationCap, description: 'Classes I-V Test resources.' },
  { href: '/classes?paper=tet-paper-2', label: 'TET Paper 2', icon: GraduationCap, description: 'Classes VI-VIII Test resources.' },
  { href: '/subjects?paper=dsc', label: 'DSC', icon: Target, description: 'District Selection Committee materials.' },
  { href: '/subjects?paper=deecet', label: 'DEECET', icon: BookOpen, description: 'Common Entrance Test resources.' },
  { href: '/subjects?paper=sgt', label: 'SGT', icon: Briefcase, description: 'Secondary Grade Teacher exam prep.' },
  { href: '/subjects?paper=sa', label: 'SA', icon: Briefcase, description: 'School Assistant exam prep.' },
  { href: '/ebooks', label: 'E-Books', icon: BookOpen, description: 'SCERT textbooks and D.Ed/B.Ed materials.' },
  { href: '/chatbot', label: 'AI Chat', icon: Bot, description: 'Ask "EduBot" to clarify concepts.' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary" style={{ textShadow: '0 0 15px hsl(var(--primary) / 0.5)' }}>
            EduSpark TET & DSC Hub
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Learn Smart, Practice Daily, Crack TET & DSC Easily
          </p>
        </header>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for topics, eBooks, lessons..."
              className="pl-10 text-base bg-card border-border"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto mb-12">
          {quickLinks.map((link) => (
            <Link href={link.href} key={link.href} className="group">
              <Card className="bg-card/80 border-border hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 h-full transform hover:-translate-y-1">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <link.icon className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle className='text-xl font-headline'>{link.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="max-w-6xl mx-auto bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Newspaper className="h-6 w-6 text-secondary" />
              Today's Update
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold text-lg text-foreground/90">DSC 2024 Notification Released!</h3>
              <p className="text-muted-foreground text-sm">Application window opens from Oct 28 to Nov 15. Click to view details.</p>
              <span className="text-xs text-secondary font-medium mt-2 inline-block">EXAM UPDATE</span>
            </div>
            <div className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold text-lg text-foreground/90">New: Child Development Chapter 5 MCQs</h3>
              <p className="text-muted-foreground text-sm">50 new practice questions on "Piaget's Cognitive Development" have been added.</p>
              <span className="text-xs text-secondary font-medium mt-2 inline-block">NEW MATERIAL</span>
            </div>
             <div className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <h3 className="font-semibold text-lg text-foreground/90">Study Tip of the Day</h3>
              <p className="text-muted-foreground text-sm">Use the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break to maximize retention.</p>
              <span className="text-xs text-secondary font-medium mt-2 inline-block">TIP</span>
            </div>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
