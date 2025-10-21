
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ebooks } from '@/lib/ebooks';
import type { EBook } from '@/lib/ebooks';

export default function EbooksPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filterBooks = (books: EBook[]) => {
    if (!searchTerm) return books;
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const telanganaBooks = ebooks.filter(book => book.state === 'telangana');
  const andhraPradeshBooks = ebooks.filter(book => book.state === 'andhra-pradesh');

  const filteredTelanganaBooks = filterBooks(telanganaBooks);
  const filteredAndhraPradeshBooks = filterBooks(andhraPradeshBooks);

  const renderBookList = (bookList: EBook[]) => {
    if (bookList.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          <p>No eBooks found matching your search.</p>
        </div>
      );
    }
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bookList.map((book) => (
            <Card key={book.id} className='flex flex-col'>
                <CardHeader>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription>{book.class} - {book.subject}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-end">
                    <p className="text-xs text-muted-foreground mb-4">Language: {book.language}</p>
                    <a href={book.pdf_url} download target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </a>
                </CardContent>
            </Card>
        ))}
      </div>
    );
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

      <Tabs defaultValue="telangana" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="telangana">Telangana</TabsTrigger>
          <TabsTrigger value="andhra-pradesh">Andhra Pradesh</TabsTrigger>
        </TabsList>
        <TabsContent value="telangana" className="mt-6">
            {renderBookList(filteredTelanganaBooks)}
        </TabsContent>
        <TabsContent value="andhra-pradesh" className="mt-6">
            {renderBookList(filteredAndhraPradeshBooks)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
