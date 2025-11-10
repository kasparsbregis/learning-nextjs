import { MailIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { getBadge } from "./StudentCard";
import { Student } from "@/data/students";

const StudentProfile = ({ student }: { student: Student }) => {
  return (
    <div className="flex flex-col items-center max-w-5xl px-4">
      <div className="flex gap-5 mt-10 border dark:border-white/50 border-black/50 px-4 py-6 w-full rounded-lg">
        <div className=" w-[50%] flex justify-center border border-black/50 dark:border-white/50 rounded-lg">
          <Image
            src={student.avatar}
            alt="image"
            width={300}
            height={300}
            unoptimized
            className="grow-0 "
          />
        </div>
        <div className="w-[50%] flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 justify-center">
              <h2 className="text-base sm:text-3xl font-bold">
                {student.name}
              </h2>
              {student.isActive ? (
                <p className="bg-green-500 h-4 w-4 rounded-full shrink-0"></p>
              ) : (
                <p className="bg-red-500 h-4 w-4 rounded-full shrink-0"></p>
              )}
            </div>
            <div className="justify-center flex">{getBadge(student.grade)}</div>
            <div className="flex flex-col gap-2">
              <h3>
                <span className="font-bold">Rating:</span> {student.grade}
              </h3>
              <h3>
                <span className="font-bold">E-mail:</span> {student.email}
              </h3>
              <h3>
                <span className="font-bold">Age:</span> {student.age} years old
              </h3>
              <h3>
                <span className="font-bold">Subjects:</span>{" "}
                {student.subjects.join(", ")}
              </h3>
            </div>
          </div>
          <div className="mb-2 flex justify-center mt-2"></div>
          <div className="flex justify-center px-4">
            <Button className="w-full items-center cursor-pointer">
              <MailIcon className="h-4 w-4" />
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
