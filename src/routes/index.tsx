import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ListTodo, Sparkles } from "lucide-react";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { CategoryFilter } from "@/components/CategoryFilter";
import { DashboardShell } from "@/components/DashboardShell";
import { ProgressSummary } from "@/components/ProgressSummary";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Category, useTasks } from "@/hooks/use-tasks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — safe-SPACE AI" },
      {
        name: "description",
        content:
          "A calm dashboard to add tasks, mark them complete and organize them by category, with a gentle AI assistant.",
      },
      { property: "og:title", content: "Dashboard — safe-SPACE AI" },
      {
        property: "og:description",
        content: "Add tasks, mark them complete and organize by category in a calm space.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { tasks, loaded, addTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<"all" | Category>("all");

  const completed = tasks.filter((task) => task.completed).length;
  const open = tasks.length - completed;

  return (
    <DashboardShell
      title="Dashboard"
      description="Your tasks, gently organized"
      actions={
        <Button asChild size="sm" variant="secondary" className="shrink-0">
          <Link to="/assistant">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assistant</span>
          </Link>
        </Button>
      }
    >
      {!loaded ? null : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={ListTodo} label="Total tasks" value={tasks.length} />
            <StatCard icon={CheckCircle2} label="Completed" value={completed} />
            <StatCard icon={Sparkles} label="Still open" value={open} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <Card className="order-2 border border-border/60 bg-card/80 shadow-lg shadow-primary/5 lg:order-1">
              <CardHeader>
                <CardTitle className="text-base">Your tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <CategoryFilter value={filter} onChange={setFilter} />
                <TaskList
                  tasks={tasks}
                  filter={filter}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </CardContent>
            </Card>

            <div className="order-1 space-y-6 lg:order-2">
              <Card className="border border-border/60 bg-card/80 shadow-lg shadow-primary/5">
                <CardHeader>
                  <CardTitle className="text-base">Add a task</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <TaskForm onAdd={addTask} />
                  <ProgressSummary total={tasks.length} completed={completed} />
                </CardContent>
              </Card>
            </div>
          </div>

          <AiDisclaimer />
        </>
      )}
    </DashboardShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ListTodo;
  label: string;
  value: number;
}) {
  return (
    <Card className="border border-border/60 bg-card/80">
      <CardContent className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
