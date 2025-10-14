'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Save } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subjects } from "@/lib/syllabus";
import { useToast } from '@/hooks/use-toast';

type DailyGoal = number; // minutes
type WeeklyPlan = {
  [day: string]: string; // day: subjectId
};

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SchedulePage() {
  const { toast } = useToast();
  const [dailyGoal, setDailyGoal] = useLocalStorage<DailyGoal>('studyGoal', 30);
  const [weeklyPlan, setWeeklyPlan] = useLocalStorage<WeeklyPlan>('weeklyPlan', {});

  const [currentGoal, setCurrentGoal] = useState(dailyGoal);
  const [currentPlan, setCurrentPlan] = useState(weeklyPlan);

  const handlePlanChange = (day: string, subjectId: string) => {
    setCurrentPlan(prev => ({ ...prev, [day]: subjectId }));
  };

  const handleSave = () => {
    setDailyGoal(currentGoal);
    setWeeklyPlan(currentPlan);
    toast({
      title: "Schedule Saved!",
      description: "Your study preferences have been updated.",
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
        <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center gap-3">
                <Calendar className="h-8 w-8" />
                Practice Schedule
            </h1>
            <p className="text-muted-foreground mt-2">Personalize your study plan to stay on track.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Clock /> Daily Study Goal</CardTitle>
                    <CardDescription>Set how many minutes you want to practice each day.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="daily-goal-slider" className="text-lg font-medium">
                                {currentGoal} minutes
                            </Label>
                        </div>
                        <Slider
                            id="daily-goal-slider"
                            min={15}
                            max={120}
                            step={15}
                            value={[currentGoal]}
                            onValueChange={(value) => setCurrentGoal(value[0])}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:row-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar /> Weekly Subject Plan</CardTitle>
                    <CardDescription>Assign a subject to each day of the week to focus your efforts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {weekDays.map(day => (
                        <div key={day} className="grid grid-cols-3 items-center gap-4">
                            <Label className="font-semibold col-span-1">{day}</Label>
                            <div className="col-span-2">
                                <Select
                                    value={currentPlan[day] || 'none'}
                                    onValueChange={(value) => handlePlanChange(day, value === 'none' ? '' : value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subject..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Rest Day</SelectItem>
                                        {subjects.map(subject => (
                                            <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        
        <div className="mt-8 flex justify-end">
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Schedule
            </Button>
        </div>
    </div>
  );
}
