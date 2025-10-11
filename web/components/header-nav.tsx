"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav(){
  const pathname = usePathname();
  const is = (p: string) => pathname === p ? { "aria-current": "page" as const } : {};
  return (
    <nav className="nav" aria-label="Primary">
      <Link {...is('/product')} href="/product">Product</Link>
      <Link {...is('/programs')} href="/programs">Courses</Link>
      <Link {...is('/pricing')} href="/pricing">Pricing</Link>
      <Link {...is('/company')} href="/company">Company</Link>
      <Link {...is('/news')} href="/news">News</Link>
      <Link className="cta" href="/docs">Docs</Link>
    </nav>
  );
}
