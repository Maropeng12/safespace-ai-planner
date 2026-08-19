import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Header } from "@/components/Header";
import { ProgressSummary } from "@/components/ProgressSummary";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { type Category, useTasks } from "@/hooks/use-tasks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "safe-SPACE AI — Calm task organization" },
      {
        name: "description",
        content: "A gentle, AI-friendly task manager for organizing your daily tasks by category.",
      },
      { property: "og:title", content: "safe-SPACE AI" },
      {
        property: "og:description",
        content: "A gentle task manager for organizing your daily tasks by category.",
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

  if (!loaded) return null;

  const completed = tasks.filter((task) => task.completed).length;

  return (
    <div className="gradient-hero min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <Header />
        <Card className="border border-border/60 bg-card/80 shadow-xl shadow-primary/5 backdrop-blur-sm">
          <CardContent className="space-y-6 p-6">
            <TaskForm onAdd={addTask} />
            <ProgressSummary total={tasks.length} completed={completed} />
            <CategoryFilter value={filter} onChange={setFilter} />
            <TaskList tasks={tasks} filter={filter} onToggle={toggleTask} onDelete={deleteTask} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
