import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const telanganaBooks = [
    { title: 'D.El.Ed First Year - CDP', description: 'Child Development and Pedagogy for D.El.Ed.', source: 'SCERT, Telangana' },
    { title: 'Class X - Social Studies', description: 'Official SCERT textbook for Class 10.', source: 'SCERT, Telangana' },
    { title: 'B.Ed Perspectives in Education', description: 'Foundational course book for B.Ed programs.', source: 'Telugu Akademi' },
    { title: 'Class VI - Science', description: 'Official SCERT textbook for Class 6.', source: 'SCERT, Telangana' },
];

const andhraPradeshBooks = [
    { title: 'D.El.Ed First Year - English', description: 'English Methodology and Content for D.El.Ed.', source: 'SCERT, Andhra Pradesh' },
    { title: 'Class IX - Mathematics', description: 'Official SCERT textbook for Class 9.', source: 'SCERT, Andhra Pradesh' },
    { title: 'B.Ed Assessment for Learning', description: 'Core textbook for B.Ed students.', source: 'AP Universities' },
    { title: 'Class VII - EVS', description: 'Environmental Studies textbook for Class 7.', source: 'SCERT, Andhra Pradesh' },
]

export default function EbooksPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center gap-3">
            <BookOpen className="h-8 w-8" />
            E-Books Library
        </h1>
        <p className="text-muted-foreground mt-2">D.El.Ed, B.Ed, and SCERT textbooks for Telangana & Andhra Pradesh.</p>
      </header>

      <div className="mb-8 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for an eBook by title or subject..."
              className="pl-10"
            />
          </div>
        </div>

      <Tabs defaultValue="telangana" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="telangana">Telangana</TabsTrigger>
          <TabsTrigger value="andhra-pradesh">Andhra Pradesh</TabsTrigger>
        </TabsList>
        <TabsContent value="telangana" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {telanganaBooks.map((book, index) => (
                    <Card key={index} className='flex flex-col'>
                        <CardHeader>
                            <CardTitle>{book.title}</CardTitle>
                            <CardDescription>{book.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-end">
                            <p className="text-xs text-muted-foreground mb-4">Source: {book.source}</p>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="andhra-pradesh" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {andhraPradeshBooks.map((book, index) => (
                    <Card key={index} className='flex flex-col'>
                        <CardHeader>
                            <CardTitle>{book.title}</CardTitle>
                            <CardDescription>{book.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-end">
                            <p className="text-xs text-muted-foreground mb-4">Source: {book.source}</p>
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
