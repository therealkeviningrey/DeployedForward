"use client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function PricingFAQ(){
  return (
    <Accordion type="single" collapsible className="grid gap-3">
      <AccordionItem value="measure">
        <AccordionTrigger>How are outcomes measured?</AccordionTrigger>
        <AccordionContent>
          <p className="muted">Each brief has KPIs scored per run; rollups for missions and campaigns.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="onprem">
        <AccordionTrigger>Do you support on‑prem?</AccordionTrigger>
        <AccordionContent>
          <p className="muted">Yes for Enterprise. Contact us.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
