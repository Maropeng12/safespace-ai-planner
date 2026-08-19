import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type Task } from "@/hooks/use-tasks";

const badgeVariantByCategory = {
  wellness: "default" as const,
  work: "secondary" as const,
  home: "accent" as const,
  personal: "muted" as const,
};

export function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const checkboxId = `task-${task.id}`;

  return (
    <div className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/20">
      <Checkbox
        id={checkboxId}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-0.5"
      />
      <label htmlFor={checkboxId} className="flex-1 cursor-pointer">
        <span
          className={cn(
            "block text-sm font-medium transition-all",
            task.completed && "text-muted-foreground line-through",
          )}
        >
          {task.text}
        </span>
        <Badge variant={badgeVariantByCategory[task.category]} className="mt-2 capitalize">
          {task.category}
        </Badge>
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="text-muted-foreground"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
