import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Home } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
            <Calendar className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Practice Schedule</CardTitle>
          <CardDescription>This feature is coming soon!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Soon, you'll be able to create personalized study schedules, set reminders, and build practice streaks.
            Get ready to make your preparation more organized and effective!
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
