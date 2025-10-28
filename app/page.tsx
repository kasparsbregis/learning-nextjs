import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

import { projects } from "@/data/projects";
import { BadgeCheck, Eye, OctagonX } from "lucide-react";
import Link from "next/link";

const totalProjects = projects.length;

const HomePage = () => {
  return (
    <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold mb-10">List of my projects</h1>
      <Table className="bg-[var(--background-light)] text-xs sm:text-md md:text-base">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead className="text-right pr-4">Project</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>
                {project.status === "Finished" ||
                project.status === "finished" ? (
                  <span className="flex gap-1 items-center">
                    <BadgeCheck className="text-green-500 h-5 w-5 bg-white rounded-full" />
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </span>
                ) : (
                  <span className="flex gap-1 items-center">
                    <OctagonX className="text-red-500 h-5 w-5 bg-white rounded-full" />
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </span>
                )}
              </TableCell>
              <TableCell className="font-bold">{project.name}</TableCell>
              <TableCell className="font-medium">
                {project.level === "easy" ? <p>⭐</p> : ""}
                {project.level === "medium" ? <p>⭐⭐⭐</p> : ""}
              </TableCell>
              <TableCell className="text-right">
                <Link href={project.href}>
                  <Button
                    variant={"secondary"}
                    className="w-[80px] cursor-pointer"
                  >
                    <Eye />
                    Visit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="">
            <TableCell
              className="text-right text-purple-500"
              colSpan={4}
            ></TableCell>
            <TableCell className="text-right text-purple-500">
              Total: {totalProjects} projects
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
};

export default HomePage;
