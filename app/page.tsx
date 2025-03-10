import Hero from "@/components/sections/hero/default";
import Navbar from "@/components/sections/navbar/default";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This will be replaced by 'use cache' soon
export const dynamic = "force-static";

export default async function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
