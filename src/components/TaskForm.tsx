import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Category, CATEGORIES } from "@/hooks/use-tasks";

const categoryLabels: Record<Category, string> = {
  wellness: "Wellness",
  work: "Work",
  home: "Home",
  personal: "Personal",
};

export function TaskForm({ onAdd }: { onAdd: (text: string, category: Category) => void }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>("personal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, category);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you need to do?"
        className="flex-1"
      />
      <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {categoryLabels[c]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="shrink-0">
        <Plus className="h-4 w-4" />
        Add task
      </Button>
    </form>
  );
}
