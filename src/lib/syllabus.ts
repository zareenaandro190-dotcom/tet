import type { Subject, Paper } from './types';
import { BookText, Languages, Calculator, FlaskConical, Globe, BrainCircuit, Book, GraduationCap, Puzzle, Newspaper, Bot, BookOpen } from 'lucide-react';

export const subjects: Subject[] = [
  {
    id: 'telugu',
    name: 'Telugu',
    icon: BookText,
    lessons: [
      { id: 'varnamala', name: 'Varnamala' },
      { id: 'sandhulu', name: 'Sandhulu' },
      { id: 'samasalu', name: 'Samasalu' },
      { id: 'chandassu', name: 'Chandassu' },
      { id: 'padyalu', name: 'Padyalu' },
    ],
  },
  {
    id: 'english',
    name: 'English',
    icon: Languages,
    lessons: [
      { id: 'parts-of-speech', name: 'Parts of Speech' },
      { id: 'tenses', name: 'Tenses' },
      { id: 'articles', name: 'Articles' },
      { id: 'prepositions', name: 'Prepositions' },
      { id: 'comprehension', name: 'Reading Comprehension' },
    ],
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    lessons: [
      { id: 'number-system', name: 'Number System' },
      { id: 'fractions', name: 'Fractions' },
      { id: 'geometry', name: 'Geometry' },
      { id: 'algebra', name: 'Algebra' },
      { id: 'mensuration', name: 'Mensuration' },
    ],
  },
  {
    id: 'environmental-studies',
    name: 'EVS',
    icon: FlaskConical,
    lessons: [
        { id: 'living-world', name: 'Living World' },
        { id: 'our-body', name: 'Our Body' },
        { id: 'plants-and-animals', name: 'Plants and Animals' },
        { id: 'food-and-health', name: 'Food and Health' },
        { id: 'water-and-air', name: 'Water and Air' },
    ]
  },
  {
    id: 'science',
    name: 'Science',
    icon: FlaskConical,
    lessons: [
      { id: 'living-world', name: 'Living World' },
      { id: 'light-sound', name: 'Light and Sound' },
      { id: 'acids-bases', name: 'Acids and Bases' },
      { id: 'human-body', name: 'Human Body' },
      { id: 'force-energy', name: 'Force and Energy' },
    ],
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    icon: Globe,
    lessons: [
      { id: 'indian-history', name: 'Indian History' },
      { id: 'geography', name: 'Geography' },
      { id: 'civics', name: 'Civics' },
      { id: 'economics', name: 'Economics' },
      { id: 'our-constitution', name: 'Our Constitution' },
    ],
  },
  {
    id: 'child-development-pedagogy',
    name: 'Pedagogy',
    icon: BrainCircuit,
    lessons: [
      { id: 'child-development', name: 'Child Development' },
      { id: 'learning-theories', name: 'Learning Theories' },
      { id: 'inclusive-education', name: 'Inclusive Education' },
      { id: 'assessment-evaluation', name: 'Assessment and Evaluation' },
      { id: 'teaching-methodologies', name: 'Teaching Methodologies' },
    ],
  },
  {
    id: 'gk-ca',
    name: 'GK &amp; Current Affairs',
    icon: Newspaper,
    lessons: [
      { id: 'ts-ca', name: 'Telangana Current Affairs' },
      { id: 'ap-ca', name: 'Andhra Pradesh Current Affairs' },
      { id: 'india-ca', name: 'India Current Affairs' },
      { id: 'world-ca', name: 'World Current Affairs' },
      { id: 'static-gk', name: 'Static GK' },
    ],
  },
  {
    id: 'methodology-ded',
    name: 'Methodology (D.Ed)',
    icon: Puzzle,
    lessons: [
        { id: 'ded-psychology', name: 'Educational Psychology (D.Ed)' },
        { id: 'ded-strategies', name: 'Teaching Strategies (D.Ed)' },
        { id: 'ded-classroom', name: 'Classroom Management (D.Ed)' },
    ],
  },
  {
    id: 'methodology-bed',
    name: 'Methodology (B.Ed)',
    icon: Puzzle,
    lessons: [
        { id: 'bed-psychology', name: 'Educational Psychology (B.Ed)' },
        { id: 'bed-strategies', name: 'Teaching Strategies (B.Ed)' },
        { id: 'bed-classroom', name: 'Classroom Management (B.Ed)' },
    ],
  },
];

// This is kept for legacy compatibility but is largely replaced by the new home screen.
export const papers: Paper[] = [
    {
        id: 'tet-paper-1',
        name: 'TET Paper 1 (Classes I-V)',
        description: 'Focuses on foundational concepts for primary school teachers.',
        icon: Book,
        classes: [
            { id: 'class-1', name: 'Class 1' },
            { id: 'class-2', name: 'Class 2' },
            { id: 'class-3', name: 'Class 3' },
            { id: 'class-4', name: 'Class 4' },
            { id: 'class-5', name: 'Class 5' },
        ]
    },
    {
        id: 'tet-paper-2',
        name: 'TET Paper 2 (Classes VI-VIII)',
        description: 'Covers advanced topics for upper primary and high school teachers.',
        icon: GraduationCap,
        classes: [
            { id: 'class-6', name: 'Class 6' },
            { id: 'class-7', name: 'Class 7' },
            { id: 'class-8', name: 'Class 8' },
        ]
    },
    {
        id: 'dsc',
        name: 'DSC Practice',
        description: 'Practice question sets for the DSC exam.',
        icon: Puzzle,
        classes: [],
        subjects: subjects.filter(s => ['telugu', 'english', 'mathematics', 'science', 'social-studies'].includes(s.id))
    },
    {
        id: 'gk-ca',
        name: 'GK &amp; Current Affairs',
        description: 'Bilingual general knowledge and current events.',
        icon: Newspaper,
        classes: [],
        subjects: subjects.filter(s => s.id === 'gk-ca')
    },
    {
        id: 'methodology',
        name: 'Methodology (D.Ed / B.Ed)',
        description: 'Pedagogy questions for D.Ed and B.Ed patterns.',
        icon: BrainCircuit,
        classes: [],
        subjects: subjects.filter(s => ['methodology-ded', 'methodology-bed'].includes(s.id))
    },
    {
        id: 'deecet',
        name: 'DEECET',
        description: 'Diploma in Elementary Education Common Entrance Test.',
        icon: Book,
        classes: [],
    },
    {
        id: 'ebooks',
        name: 'E-Books',
        description: 'Library of textbooks and resources.',
        icon: BookOpen,
        classes: [],
    },
    {
        id: 'chatbot',
        name: 'AI Chatbot',
        description: 'Your personal AI study assistant.',
        icon: Bot,
        classes: [],
    }
]
