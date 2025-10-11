"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import React from "react";

const list = cva(
  "inline-flex items-center gap-2 border border-bd1 p-1",
);

const trigger = cva(
  "px-3 py-1.5 text-sm text-fg3 border border-transparent data-[state=active]:text-fg1 data-[state=active]:border-accent",
);

export function Tabs({ children, className, ...props }: TabsPrimitive.TabsProps & { className?: string }) {
  return (
    <TabsPrimitive.Root className={twMerge(className)} {...props}>
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabsList({ className, ...props }: TabsPrimitive.TabsListProps) {
  return <TabsPrimitive.List className={twMerge(list(), className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: TabsPrimitive.TabsTriggerProps) {
  return <TabsPrimitive.Trigger className={twMerge(trigger(), className)} {...props} />;
}

export const TabsContent = TabsPrimitive.Content;
