import { Progress } from "@/components/ui/progress";

export function ProgressSummary({ total, completed }: { total: number; completed: number }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {completed} of {total} completed
        </span>
        <span className="font-medium text-primary">{percentage}%</span>
      </div>
      <Progress value={percentage} />
    </div>
  );
}
