'use client';

export type EBook = {
    id: string;
    title: string;
    description: string;
    source: string;
    state: 'telangana' | 'andhra-pradesh';
    pdf_url: string;
};

// NOTE: Using a dummy PDF link as a placeholder.
// In a real application, these would be full URLs from Firebase Storage.
const dummyPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export const ebooks: EBook[] = [
    { 
        id: 'ts-book-001',
        title: 'D.El.Ed First Year - CDP', 
        description: 'Child Development and Pedagogy for D.El.Ed.', 
        source: 'SCERT, Telangana',
        state: 'telangana',
        pdf_url: dummyPdfUrl
    },
    { 
        id: 'ts-book-002',
        title: 'Class X - Social Studies', 
        description: 'Official SCERT textbook for Class 10.', 
        source: 'SCERT, Telangana',
        state: 'telangana',
        pdf_url: dummyPdfUrl
    },
    { 
        id: 'ts-book-003',
        title: 'B.Ed Perspectives in Education', 
        description: 'Foundational course book for B.Ed programs.', 
        source: 'Telugu Akademi',
        state: 'telangana',
        pdf_url: dummyPdfUrl
    },
    { 
        id: 'ts-book-004',
        title: 'Class VI - Science', 
        description: 'Official SCERT textbook for Class 6.', 
        source: 'SCERT, Telangana',
        state: 'telangana',
        pdf_url: dummyPdfUrl
    },
    { 
        id: 'ap-book-001',
        title: 'D.El.Ed First Year - English', 
        description: 'English Methodology and Content for D.El.Ed.', 
        source: 'SCERT, Andhra Pradesh',
        state: 'andhra-pradesh',
        pdf_url: dummyPdfUrl
    },
    { 
        id: 'ap-book-002',
        title: 'Class IX - Mathematics', 
        description: 'Official SCERT textbook for Class 9.', 
        source: 'SCERT, Andhra Pradesh',
        state: 'andhra-pradesh',
        pdf_url: dummyPdfUrl
    },
    { 
        id: 'ap-book-003',
        title: 'B.Ed Assessment for Learning', 
        description: 'Core textbook for B.Ed students.', 
        source: 'AP Universities',
        state: 'andhra-pradesh',
        pdf_url: dummyPdfUrl
    },
    { 
        id: 'ap-book-004',
        title: 'Class VII - EVS', 
        description: 'Environmental Studies textbook for Class 7.', 
        source: 'SCERT, Andhra Pradesh',
        state: 'andhra-pradesh',
        pdf_url: dummyPdfUrl
    },
];
