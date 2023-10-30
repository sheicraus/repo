import ChecklistForm from "@/app/components/checklist/ChecklistForm";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Landing page
 */
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-5 h-screen w-screen bg-primaryBg">
      <h1 className="font-bold text-6xl text-secondary-100">
        repo
      </h1>
      <h2 className="font-medium text-lg text-center text-primaryText my-5">
        Create, collaborate, and share checklists
      </h2>

      <ChecklistForm/>

      <footer className="absolute bottom-10">
        <FontAwesomeIcon fontSize={12} icon={faHeart} bounce className="text-secondary-50 mr-2" />
        <span className="text-xs">Made with passion by Sheila Craus</span>
      </footer>
    </main>
  );
}
