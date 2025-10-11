"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";

export default function CommandPalette(){
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    const onKey = (e: KeyboardEvent)=>{
      if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k'){
        e.preventDefault();
        setOpen(v=>!v);
      }
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[]);

  function go(href: Route){ setOpen(false); router.push(href); }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60"/>
        <Dialog.Content className="fixed left-1/2 top-24 z-50 w-[90vw] max-w-xl -translate-x-1/2 border border-bd1 bg-bg0">
          <Command label="Command Menu" className="bg-bg0 text-fg1">
            <Command.Input autoFocus placeholder="Search… (⌘K)" className="w-full bg-bg2 px-3 py-2 outline-none" />
            <Command.List className="max-h-80 overflow-auto">
              <Command.Empty className="p-3 text-fg3">No results.</Command.Empty>
              <Command.Group heading="Navigate">
                <Command.Item onSelect={()=>go('/')}>Home</Command.Item>
                <Command.Item onSelect={()=>go('/product')}>Product</Command.Item>
                <Command.Item onSelect={()=>go('/programs')}>Programs</Command.Item>
                <Command.Item onSelect={()=>go('/pricing')}>Pricing</Command.Item>
                <Command.Item onSelect={()=>go('/company')}>Company</Command.Item>
                <Command.Item onSelect={()=>go('/news')}>News</Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
