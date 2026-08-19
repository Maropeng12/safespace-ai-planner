import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="h-7 w-7" />
      </div>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        safe-SPACE AI
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        A gentle space to organize your tasks by category.
      </p>
    </div>
  );
}
