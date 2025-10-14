'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Home, ListChecks, Target, Clock } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { QuizResult } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function ProgressPage() {
  const [quizHistory] = useLocalStorage<QuizResult[]>('quizHistory', []);
  const router = useRouter();

  if (quizHistory.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
              <TrendingUp className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">My Progress</CardTitle>
            <CardDescription>No quiz history found.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Complete a quiz to see your progress here. Your performance, weak areas, and improvement over time will be tracked.
            </p>
            <Link href="/">
              <Button>
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalQuizzes = quizHistory.length;
  const averageScore = Math.round(quizHistory.reduce((acc, result) => acc + result.score, 0) / totalQuizzes);
  const totalTime = quizHistory.reduce((acc, result) => acc + result.timeSpent, 0);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    let timeString = '';
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0) timeString += `${minutes}m `;
    timeString += `${remainingSeconds}s`;
    
    return timeString.trim();
  };

  const handleResultClick = (result: QuizResult) => {
    localStorage.setItem('quizResults', JSON.stringify(result));
    router.push('/quiz/results');
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
        <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center gap-3">
                <TrendingUp className="h-8 w-8" />
                My Progress
            </h1>
            <p className="text-muted-foreground mt-2">An overview of your quiz performance.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
                    <ListChecks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalQuizzes}</div>
                    <p className="text-xs text-muted-foreground">quizzes completed</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageScore}%</div>
                    <p className="text-xs text-muted-foreground">across all quizzes</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatTime(totalTime)}</div>
                     <p className="text-xs text-muted-foreground">spent on quizzes</p>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Quiz History</CardTitle>
                <CardDescription>Click on a quiz to see the detailed results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {quizHistory.slice(0, 10).map((result, index) => (
                    <div key={index} 
                        onClick={() => handleResultClick(result)}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                        <div>
                            <p className="font-semibold">{result.subject} - <span className="text-muted-foreground">{result.lesson}</span></p>
                            <p className="text-sm text-muted-foreground">
                                {new Date(result.timestamp || Date.now()).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-right">
                           <p className={`font-bold text-lg ${result.score > 75 ? 'text-primary' : result.score > 50 ? 'text-yellow-500' : 'text-destructive'}`}>
                                {result.score}%
                            </p>
                           <p className="text-xs text-muted-foreground">{result.userAnswers.filter(a=>a.isCorrect).length}/{result.mcqs.length} correct</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}