
'use client';

import { useState } from 'react';
import { LucideIcon, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

type FlashcardProps = {
  question: string;
  answer: string;
  SubjectIcon: LucideIcon;
  className?: string;
  isAIGenerated?: boolean;
};

export default function Flashcard({
  question,
  answer,
  SubjectIcon,
  className,
  isAIGenerated = false,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div
      className={cn('w-full h-full rounded-2xl cursor-pointer transform-style-3d transition-transform duration-700', isFlipped ? 'rotate-y-180' : '')}
      onClick={handleFlip}
    >
      {/* Front of the card (Question) */}
      <Card
        className={cn(
          'absolute w-full h-full backface-hidden flex flex-col justify-between p-6 overflow-hidden shadow-2xl',
          className
        )}
      >
        <CardContent className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-2xl font-bold font-headline">{question}</p>
        </CardContent>
        <div className="absolute top-4 left-4">
          <SubjectIcon className="h-6 w-6 opacity-70" />
        </div>
        {isAIGenerated && (
            <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-black/10">
                <Sparkles className="h-4 w-4" />
                AI
            </div>
        )}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs opacity-60">
            <RefreshCw className="h-3 w-3" />
            Click to flip
        </div>
      </Card>
      
      {/* Back of the card (Answer) */}
      <Card
        className={cn(
          'absolute w-full h-full backface-hidden rotate-y-180 flex flex-col justify-between p-6 overflow-hidden shadow-2xl',
          className
        )}
        style={{ background: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), ${className?.includes('gradient') ? '' : 'var(--background)'}` }}
      >
         <CardContent className="flex flex-col items-center justify-center h-full text-center">
             <p className="text-xl font-medium">{answer}</p>
        </CardContent>
        <div className="absolute top-4 left-4">
          <SubjectIcon className="h-6 w-6 opacity-70" />
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs opacity-60">
            <RefreshCw className="h-3 w-3" />
            Click to flip
        </div>
      </Card>
    </div>
  );
}
