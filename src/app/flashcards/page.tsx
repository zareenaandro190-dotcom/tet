
'use client';

import { useState, useEffect } from 'react';
import { Layers, ArrowLeft, ArrowRight, BookText, Languages, Calculator, FlaskConical, Globe, BrainCircuit } from 'lucide-react';
import Flashcard from '@/components/flashcard';
import { Button } from '@/components/ui/button';

const initialFlashcardData = [
  { subject: 'English', question: "What are the three main types of tenses?", answer: "Past, Present, and Future.", icon: Languages, color: 'bg-[#FF9A8B] text-gray-800' },
  { subject: 'Telugu', question: "'అమ్మ' పదం యొక్క అర్థం ఏమిటి?", answer: "తల్లి, జనని", icon: BookText, color: 'bg-[#FBC2EB] text-gray-800' },
  { subject: 'Maths', question: "What is the formula for the area of a circle?", answer: "A = πr²", icon: Calculator, color: 'bg-[#A1C4FD] text-gray-800' },
  { subject: 'EVS', question: "What are the components of an ecosystem?", answer: "Biotic (living) and Abiotic (non-living) components.", icon: FlaskConical, color: 'bg-[#B5FFFC] text-gray-800' },
  { subject: 'Social', question: "Who was the first Prime Minister of India?", answer: "Jawaharlal Nehru", icon: Globe, color: 'bg-[#FFD93D] text-gray-800' },
  { subject: 'Pedagogy', question: "What are Piaget's stages of cognitive development?", answer: "Sensorimotor, Preoperational, Concrete operational, and Formal operational.", icon: BrainCircuit, color: 'bg-gradient-to-br from-[#6A11CB] to-[#2575FC] text-white', isAIGenerated: true },
];


export default function FlashcardsPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flashcardData, setFlashcardData] = useState(initialFlashcardData);

    useEffect(() => {
        // Shuffle the array on client-side mount to ensure new order on each visit
        const shuffledData = [...initialFlashcardData].sort(() => Math.random() - 0.5);
        setFlashcardData(shuffledData);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashcardData.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === flashcardData.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center gap-3 justify-center">
                    <Layers className="h-8 w-8" />
                    Flashcards
                </h1>
                <p className="text-muted-foreground mt-2">Flip the card to see the answer. Use arrows to navigate.</p>
            </header>

            <div className="w-full max-w-2xl flex items-center justify-center gap-4">
                 <Button variant="outline" size="icon" onClick={goToPrevious} className="shrink-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>

                <div className="relative w-full h-[400px] perspective-1000">
                    {flashcardData.map((card, index) => (
                        <div
                            key={index}
                            className="absolute w-full h-full transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(${(index - currentIndex) * 100}%) rotateY(${(index - currentIndex) * -30}deg) scale(${index === currentIndex ? 1 : 0.8})`,
                                zIndex: flashcardData.length - Math.abs(index - currentIndex),
                                opacity: index === currentIndex ? 1 : 0.5,
                            }}
                        >
                            <Flashcard 
                                question={card.question}
                                answer={card.answer}
                                SubjectIcon={card.icon}
                                className={card.color}
                                isAIGenerated={card.isAIGenerated}
                            />
                        </div>
                    ))}
                </div>

                <Button variant="outline" size="icon" onClick={goToNext} className="shrink-0">
                    <ArrowRight className="h-6 w-6" />
                </Button>
            </div>
            <div className="mt-4 text-muted-foreground text-sm">
                Card {currentIndex + 1} of {flashcardData.length}
            </div>
        </div>
    );
}
