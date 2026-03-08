"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { cn } from "@/lib/utils";

type SidebarContextValue = {
  collapsed: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextValue>({ collapsed: false, toggle: () => {} });

export function useSidebar() {
  return useContext(SidebarContext);
}

type SidebarProps = {
  children: ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
};

export function Sidebar({ children, defaultCollapsed = false, className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, toggle: () => setCollapsed((c) => !c) }}>
      <aside
        className={cn(
          "border-border bg-card flex h-full flex-col border-r transition-all duration-200",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("border-border flex items-center border-b px-4 py-4", className)}>
      <div className={cn("min-w-0 flex-1", collapsed && "sr-only")}>{children}</div>
    </div>
  );
}

export function SidebarContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex-1 overflow-y-auto p-2", className)}>{children}</div>;
}

export function SidebarFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("border-border border-t p-2", className)}>{children}</div>;
}

export function SidebarToggle({ className }: { className?: string }) {
  const { collapsed, toggle } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "text-muted-foreground hover:bg-secondary hover:text-foreground flex w-full cursor-pointer items-center justify-center rounded-lg p-2 transition-colors",
        className
      )}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? <FiChevronRight className="h-4 w-4" /> : <FiChevronLeft className="h-4 w-4" />}
    </button>
  );
}

type SidebarItemProps = {
  icon?: ReactNode;
  active?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function SidebarItem({ icon, active, children, className, onClick }: SidebarItemProps) {
  const { collapsed } = useSidebar();
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        collapsed && "justify-center px-2",
        className
      )}
      title={collapsed && typeof children === "string" ? children : undefined}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {!collapsed && <span className="min-w-0 truncate">{children}</span>}
    </button>
  );
}

export function SidebarGroup({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("py-2", className)}>
      {label && !collapsed && (
        <p className="text-muted-foreground mb-1 px-3 text-xs font-semibold tracking-wider uppercase">
          {label}
        </p>
      )}
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}
