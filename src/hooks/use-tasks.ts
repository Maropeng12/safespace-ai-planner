import { useState, useEffect, useCallback } from "react";

export const CATEGORIES = ["wellness", "work", "home", "personal"] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Task {
  id: string;
  text: string;
  category: Category;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = "safe-space-ai-tasks";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setTasks(parsed as Task[]);
        }
      }
    } catch (e) {
      console.error("Failed to load tasks", e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks", e);
    }
  }, [tasks, loaded]);

  const addTask = useCallback((text: string, category: Category) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      {
        id: generateId(),
        text: trimmed,
        category,
        completed: false,
        createdAt: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  return { tasks, loaded, addTask, toggleTask, deleteTask };
}
