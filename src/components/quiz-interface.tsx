'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ArrowRight, BrainCircuit, Lightbulb } from 'lucide-react';
import type { Quiz, UserAnswer, QuizResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import { explainAnswer } from '@/ai/flows/explain-answer';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type QuizInterfaceProps = {
  quiz: Quiz;
};

type Language = 'english' | 'telugu' | 'urdu';

export default function QuizInterface({ quiz }: QuizInterfaceProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [quizHistory, setQuizHistory] = useLocalStorage<QuizResult[]>('quizHistory', []);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');

  const [detailedExplanation, setDetailedExplanation] = useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const currentMCQ = quiz.mcqs[currentQuestionIndex];
  const currentQuestion = currentMCQ.language_versions[selectedLanguage] || currentMCQ.language_versions.english;
  const progress = ((currentQuestionIndex + 1) / quiz.mcqs.length) * 100;
  
  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;

    setSelectedOption(option);
    setShowFeedback(true);
    const correct = option === currentQuestion.correct_answer;
    setUserAnswers([
      ...userAnswers,
      { questionIndex: currentQuestionIndex, selectedOption: option, isCorrect: correct },
    ]);
  };
  
  const handleGetDeeperExplanation = async () => {
    setIsExplanationLoading(true);
    setDetailedExplanation(null);
    try {
        const result = await explainAnswer({
            question: currentQuestion.question,
            answer: currentQuestion.correct_answer,
            explanation: currentQuestion.explanation,
        });
        setDetailedExplanation(result.detailedExplanation);
    } catch (error) {
        console.error("Error fetching detailed explanation:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch a deeper explanation. Please try again."
        });
    } finally {
        setIsExplanationLoading(false);
    }
  }

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setDetailedExplanation(null);
    setIsExplanationLoading(false);

    if (currentQuestionIndex < quiz.mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of quiz
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000); // in seconds
      const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
      const score = Math.round((correctAnswers / quiz.mcqs.length) * 100);

      const results: QuizResult = {
        id: `${quiz.subject}-${quiz.lesson}-${Date.now()}`,
        timestamp: Date.now(),
        subject: quiz.subject,
        lesson: quiz.lesson,
        mcqs: quiz.mcqs,
        userAnswers,
        score,
        accuracy: score,
        timeSpent,
      };

      setQuizHistory([results, ...quizHistory]);
      localStorage.setItem('quizResults', JSON.stringify(results));
      router.push('/quiz/results');
    }
  };
  
  const isCorrect = selectedOption === currentQuestion.correct_answer;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
         <div className="flex justify-between items-center mb-4">
            <div>
                <CardTitle className="font-headline text-2xl">{quiz.subject}</CardTitle>
                <CardDescription>Lesson: {quiz.lesson} - Question {currentQuestionIndex + 1} of {quiz.mcqs.length}</CardDescription>
            </div>
            <Tabs defaultValue="english" value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)} className="w-auto">
              <TabsList>
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="telugu">తెలుగు</TabsTrigger>
                <TabsTrigger value="urdu">اردو</TabsTrigger>
              </TabsList>
            </Tabs>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrectAnswer = option === currentQuestion.correct_answer;

            let buttonClass = '';
            if (showFeedback) {
              if (isCorrectAnswer) {
                buttonClass = 'bg-green-600 hover:bg-green-700 text-white border-green-600';
              } else if (isSelected) {
                buttonClass = 'bg-red-600 hover:bg-red-700 text-white border-red-600';
              }
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  'w-full justify-start h-auto py-3 text-left whitespace-normal',
                  showFeedback && 'cursor-not-allowed',
                  isSelected && 'border-2',
                  buttonClass
                )}
                onClick={() => handleOptionSelect(option)}
                disabled={showFeedback}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}:</span>
                {option}
              </Button>
            );
          })}
        </div>
        {showFeedback && (
          <Alert variant={isCorrect ? 'default' : 'destructive'} className={isCorrect ? 'bg-green-100 border-green-400' : ''}>
            {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
            <AlertDescription>
                {!isCorrect && <p className="mb-2 font-semibold">The correct answer is: {currentQuestion.correct_answer}</p>}
                <p className="mb-2">{currentQuestion.explanation}</p>
                
                {!detailedExplanation && !isExplanationLoading && (
                    <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleGetDeeperExplanation}>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Get a deeper explanation
                    </Button>
                )}

                {isExplanationLoading && (
                    <div className="space-y-2 mt-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                )}
                
                {detailedExplanation && (
                    <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold flex items-center mb-2 text-primary">
                            <BrainCircuit className="h-5 w-5 mr-2" />
                            Deeper Dive
                        </h4>
                        <p>{detailedExplanation}</p>
                    </div>
                )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {showFeedback && (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < quiz.mcqs.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
