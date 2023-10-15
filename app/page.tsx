"use client"
import { AddIcon } from "@chakra-ui/icons";
import Button from "../components/buttons/Button";
import Link from "next/link";

/**
 * Landing page
 */
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-5 h-screen w-screen bg-primaryBg">
        <h1 className="font-bold text-6xl text-secondary-100">repo</h1>
        <h2 className="font-medium text-lg text-primaryText mt-5">
          Create, collaborate, and share checklists to anyone
        </h2>
        <Link href="/checklist">
          <Button className="mt-6" primary><span className="pr-2"><AddIcon/></span>Create a list</Button>
        </Link>
    </main>
  );
}
