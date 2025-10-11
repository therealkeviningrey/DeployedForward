"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function Accordion(props: AccordionPrimitive.AccordionSingleProps) {
  return <AccordionPrimitive.Root {...props} className={twMerge("border-bd1 grid gap-3", props.className)}/>;
}

export function AccordionItem({ className, ...props }: AccordionPrimitive.AccordionItemProps) {
  return <AccordionPrimitive.Item {...props} className={twMerge("border border-bd1", className)} />;
}

export function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger {...props} className={twMerge("w-full text-left px-4 py-3 flex items-center justify-between", className)}>
        {children}
        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180"/>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, ...props }: AccordionPrimitive.AccordionContentProps) {
  return <AccordionPrimitive.Content {...props} className={twMerge("px-4 py-3 border-t border-bd1", className)} />;
}
