
'use client';

export type EBook = {
    id: string;
    title: string;
    description: string; // Keep description for now, can be derived or static
    subject: string;
    class: string;
    course: string;
    exam_type: string;
    state: 'telangana' | 'andhra-pradesh';
    language: string;
    pdf_url: string;
    source: string;
    date_added: string;
};

export const ebooks: EBook[] = [
      {
        "id": "ebook_tg_001",
        "title": "Class 1 English Textbook",
        "description": "Official textbook for Class 1 English.",
        "subject": "English",
        "class": "Class 1",
        "course": "D.Ed / TET",
        "exam_type": "TET",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class1-English-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_002",
        "title": "Class 1 Telugu Textbook",
        "description": "Official textbook for Class 1 Telugu.",
        "subject": "Telugu",
        "class": "Class 1",
        "course": "D.Ed / TET",
        "exam_type": "TET",
        "state": "telangana",
        "language": "Telugu",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class1-Telugu-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_003",
        "title": "Class 2 Mathematics Textbook",
        "description": "Official textbook for Class 2 Mathematics.",
        "subject": "Mathematics",
        "class": "Class 2",
        "course": "D.Ed / TET",
        "exam_type": "TET",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class2-Mathematics-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_004",
        "title": "Class 3 EVS Textbook",
        "description": "Official textbook for Class 3 EVS.",
        "subject": "Environmental Studies",
        "class": "Class 3",
        "course": "D.Ed / TET",
        "exam_type": "TET",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class3-EVS-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_005",
        "title": "Class 4 Social Studies Textbook",
        "description": "Official textbook for Class 4 Social Studies.",
        "subject": "Social Studies",
        "class": "Class 4",
        "course": "D.Ed / TET",
        "exam_type": "TET",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class4-SocialStudies-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_006",
        "title": "Class 5 English Textbook",
        "description": "Official textbook for Class 5 English.",
        "subject": "English",
        "class": "Class 5",
        "course": "D.Ed / TET",
        "exam_type": "TET",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class5-English-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_007",
        "title": "Class 6 General Science Textbook",
        "description": "Official textbook for Class 6 Science.",
        "subject": "Science",
        "class": "Class 6",
        "course": "B.Ed / DSC",
        "exam_type": "DSC",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class6-Science-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_008",
        "title": "Class 7 Mathematics Textbook",
        "description": "Official textbook for Class 7 Mathematics.",
        "subject": "Mathematics",
        "class": "Class 7",
        "course": "B.Ed / DSC",
        "exam_type": "DSC",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class7-Mathematics-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_009",
        "title": "Class 8 Social Studies Textbook",
        "description": "Official textbook for Class 8 Social Studies.",
        "subject": "Social Studies",
        "class": "Class 8",
        "course": "B.Ed / DSC",
        "exam_type": "DSC",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class8-Social-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
      {
        "id": "ebook_tg_010",
        "title": "Class 10 Physical Science Textbook",
        "description": "Official textbook for Class 10 Physical Science.",
        "subject": "Physical Science",
        "class": "Class 10",
        "course": "B.Ed / DSC",
        "exam_type": "DSC",
        "state": "telangana",
        "language": "English",
        "pdf_url": "https://scert.telangana.gov.in/pdf/Class10-PhysicalScience-TM.pdf",
        "source": "https://scert.telangana.gov.in/e-Textbooks.htm",
        "date_added": "2025-10-21"
      },
       // Adding a few dummy entries for Andhra Pradesh to keep the tab functional
    { 
        id: 'ap-book-001',
        title: 'Class 6 Social Studies (AP)', 
        description: 'Official SCERT textbook for Class 6 Social Studies.', 
        subject: 'Social Studies',
        class: 'Class 6',
        course: 'B.Ed / DSC',
        exam_type: 'DSC',
        state: 'andhra-pradesh',
        language: 'English',
        pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        source: 'SCERT, Andhra Pradesh',
        date_added: "2025-10-21"
    },
    { 
        id: 'ap-book-002',
        title: 'Class 8 Mathematics (AP)', 
        description: 'Official SCERT textbook for Class 8 Mathematics.', 
        subject: 'Mathematics',
        class: 'Class 8',
        course: 'B.Ed / DSC',
        exam_type: 'DSC',
        state: 'andhra_pradesh',
        language: 'English',
        pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        source: 'SCERT, Andhra Pradesh',
        date_added: "2025-10-21"
    },
];
