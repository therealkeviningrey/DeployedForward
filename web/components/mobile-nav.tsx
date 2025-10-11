"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function MobileNav(){
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="md:hidden btn" aria-label="Menu">
          <Menu className="h-4 w-4"/>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-[80vw] max-w-sm bg-bg0 border-l border-bd1 p-6">
          <nav className="grid gap-4 text-fg1" aria-label="Mobile">
            <Link href="/product">Product</Link>
            <Link href="/programs">Programs</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/company">Company</Link>
            <Link href="/news">News</Link>
            <Link className="btn btn-primary" href="/docs">Docs</Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
