import QuizResults from "@/components/quiz-results";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ResultsLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <Skeleton className="h-10 w-1/2 mb-2" />
      <Skeleton className="h-6 w-1/3 mb-8" />
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-64 w-full mb-8" />
      <Skeleton className="h-10 w-1/4 mb-4" />
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <QuizResults />
    </Suspense>
  );
}
