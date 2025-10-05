import "./globals.css";
import { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";


export const metadata = {
title: "Bitpers — The Visual Layer for Human Connection",
description: "Murals, Memory Boards and Collab tools to turn photos into living stories.",
};


export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
<div className="mx-auto max-w-7xl px-4">
<Nav />
<main className="py-10">{children}</main>
<Footer />
</div>
</body>
</html>
);
}