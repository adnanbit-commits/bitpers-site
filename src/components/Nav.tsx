import Link from "next/link";
export function Nav() {
return (
<header className="flex items-center justify-between py-5">
<Link href="/" className="font-bold text-lg">Bitpers</Link>
<nav className="flex gap-5 text-sm text-zinc-300">
<Link href="/build-with-us">Build With Us</Link>
<Link href="/donate">Donate</Link>
</nav>
</header>
);
}