import Link from "next/link";
import { Button } from "./ui/button";

interface Project {
  id: number;
  name: string;
  level: string;
  href: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="w-full min-w-md bg-gray-800 px-8 py-4 flex flex-col gap-4 h-[200px] justify-between rounded-xl">
      <h1 className="font-bold text-center text-xl">{project.name}</h1>
      <p>Difficulty: {project.level}</p>

      <Link href={project.href}>
        <Button className="w-full cursor-pointer">Go to Project</Button>
      </Link>
    </div>
  );
};

export default ProjectCard;
