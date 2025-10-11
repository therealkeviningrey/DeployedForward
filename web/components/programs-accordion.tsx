"use client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function ProgramsAccordion(){
  return (
    <Accordion type="single" collapsible className="grid gap-3">
      <AccordionItem value="eligibility">
        <AccordionTrigger>Eligibility</AccordionTrigger>
        <AccordionContent>
          <p className="muted">Engineers and operators. Start with a repo and a goal.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="outcomes">
        <AccordionTrigger>Outcomes</AccordionTrigger>
        <AccordionContent>
          <p className="muted">Per-brief KPIs roll into mission and campaign scorecards.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
