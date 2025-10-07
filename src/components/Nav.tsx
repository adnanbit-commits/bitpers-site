import Link from "next/link";
import Image from "next/image";
import logo from "@public/images/bitpers.png";

export function NavLinks({ className = "" }: { className?: string }) {
  return (
    <nav className={`flex gap-5 text-sm ${className}`}>
      <Link href="/founder_team" className="text-red-400 hover:text-blue-600 transition">
        Team
      </Link>
    </nav>
  );
}

export function Nav() {
  return (
    <header className="flex items-center justify-between py-5">
      <Link href="/" aria-label="Bitpers home" className="flex items-center gap-2">
        {/* Logo: crisp, doesn’t stretch; height drives size */}
        <Image
          src={logo}
          alt="Bitpers logo"
          height={33}               // tweak: 20–32 looks good
          // width is auto from intrinsic ratio; prevents distortion
          className="block"
          priority={false}
        />
        <span className="font-bold text-lg">Bitpers</span>
      </Link>

      <NavLinks />
    </header>
  );
}
