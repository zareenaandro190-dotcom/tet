import type { Subject, Paper } from './types';
import { BookText, Languages, Calculator, FlaskConical, Globe, BrainCircuit, Book, GraduationCap } from 'lucide-react';

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
];

export const papers: Paper[] = [
    {
        id: 'paper-1',
        name: 'Paper 1 (Classes I-V)',
        description: 'Focuses on foundational concepts for primary school teachers.',
        classes: [
            { id: 'class-1', name: 'Class 1' },
            { id: 'class-2', name: 'Class 2' },
            { id: 'class-3', name: 'Class 3' },
            { id: 'class-4', name: 'Class 4' },
            { id: 'class-5', name: 'Class 5' },
        ]
    },
    {
        id: 'paper-2',
        name: 'Paper 2 (Classes VI-VIII)',
        description: 'Covers advanced topics for upper primary and high school teachers.',
        classes: [
            { id: 'class-6', name: 'Class 6' },
            { id: 'class-7', name: 'Class 7' },
            { id: 'class-8', name: 'Class 8' },
        ]
    }
]
