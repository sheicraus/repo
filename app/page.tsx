import CreateListButton from "@/app/components/CreateListButton";

/**
 * Landing page
 */
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-5 h-screen w-screen bg-primaryBg">
        <h1 className="font-bold text-6xl text-secondary-100">repo</h1>
        <h2 className="font-medium text-lg text-primaryText my-5">
          Create, collaborate, and share checklists to anyone
        </h2>
        <CreateListButton/>
    </main>
  );
}
