import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  Mail,
  FileText,
  CalendarCheck,
  BookOpen,
  MessageCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const workspaceItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AI Assistant", url: "/assistant", icon: Sparkles },
  { title: "AI Chatbot", url: "/chat", icon: MessageCircle },
];

const toolItems = [
  { title: "Email Generator", url: "/email", icon: Mail },
  { title: "Notes Summarizer", url: "/notes", icon: FileText },
  { title: "Task Planner", url: "/planner", icon: CalendarCheck },
  { title: "Research Assistant", url: "/research", icon: BookOpen },
];

const aboutItems = [{ title: "Responsible AI", url: "/responsible-ai", icon: ShieldCheck }];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (router) => router.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex min-w-0 items-center gap-2 px-2 py-1.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          {!collapsed && (
            <span className="truncate text-sm font-semibold text-foreground">safe-SPACE AI</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {(
          [
            ["Workspace", workspaceItems],
            ["AI Tools", toolItems],
            ["About", aboutItems],
          ] as const
        ).map(([label, group]) => (
          <SidebarGroup key={label}>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={currentPath === item.url}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {!collapsed && (
        <SidebarFooter>
          <p className="px-2 pb-2 text-xs leading-relaxed text-muted-foreground">
            AI responses may be inaccurate. Always use your own judgement.
          </p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
