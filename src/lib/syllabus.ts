import type { Subject } from './types';
import { BookText, Languages, Calculator, FlaskConical, Globe, BrainCircuit } from 'lucide-react';

export const subjects: Subject[] = [
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
    id: 'pedagogy',
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
