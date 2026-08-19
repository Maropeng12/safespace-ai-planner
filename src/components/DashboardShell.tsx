import type { ReactNode } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-md">
        <SidebarTrigger />
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-foreground sm:text-xl">{title}</h1>
          {description && (
            <p className="truncate text-xs text-muted-foreground sm:text-sm">{description}</p>
          )}
        </div>
        {actions}
      </header>
      <main className="gradient-hero flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl space-y-6">{children}</div>
      </main>
    </div>
  );
}
