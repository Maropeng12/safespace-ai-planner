import { TaskItem } from "./TaskItem";
import { type Category, CATEGORIES, type Task } from "@/hooks/use-tasks";

type FilterValue = "all" | Category;

function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.createdAt - a.createdAt;
  });
}

export function TaskList({
  tasks,
  filter,
  onToggle,
  onDelete,
}: {
  tasks: Task[];
  filter: FilterValue;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const filtered = filter === "all" ? tasks : tasks.filter((task) => task.category === filter);
  const sorted = sortTasks(filtered);

  if (sorted.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 py-12 text-center">
        <p className="text-sm font-medium text-foreground">No tasks here</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a task to begin your safe space.
        </p>
      </div>
    );
  }

  if (filter !== "all") {
    return (
      <div className="space-y-3">
        {sorted.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>
    );
  }

  const grouped = CATEGORIES.map((category) => ({
    category,
    items: sorted.filter((task) => task.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6">
      {grouped.map((group) => (
        <section key={group.category}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group.category}
          </h3>
          <div className="space-y-3">
            {group.items.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
