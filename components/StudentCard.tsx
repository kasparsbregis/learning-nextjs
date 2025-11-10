import Image from "next/image";
import { Student } from "@/data/students";
import { Button } from "./ui/button";
import Link from "next/link";
const getStars = (grade: number) => {
  if (grade >= 90) return "⭐⭐⭐⭐";
  if (grade >= 80) return "⭐⭐⭐";
  if (grade >= 70) return "⭐⭐";
  return "⭐";
};

export const getBadge = (grade: number) => {
  if (grade >= 90)
    return (
      <div className="mb-2">
        <span className="bg-blue-800/50 border border-white/50 px-3 py-1 rounded-full">
          A student
        </span>
      </div>
    );
  if (grade >= 80)
    return (
      <div className="mb-2">
        <span className="bg-green-800/50 border border-white/50 px-3 py-1 rounded-full">
          B student
        </span>
      </div>
    );
  if (grade >= 70)
    return (
      <div className="mb-2">
        <span className="bg-yellow-800/50 border border-white/50 px-3 py-1 rounded-full">
          C student
        </span>
      </div>
    );
  return (
    <div className="mb-2">
      <span className="bg-red-800/50 border border-white/50 px-3 py-1 rounded-full">
        D/F student
      </span>
    </div>
  );
};

const StudentCard = ({ student }: { student: Student }) => {
  return (
    <div className="flex max-w-5xl dark:bg-gray-800 bg-gray-300 p-4 rounded-xl justify-between border border-black/50 dark:border-white/50">
      <div className="flex gap-5 items-center w-full">
        <div>
          <Image
            src={student.avatar}
            alt="image"
            width={120}
            height={120}
            unoptimized
            className="rounded-full bg-gray-500"
            loading="eager"
          />
        </div>
        <div className="shrink">
          <h3 className="font-bold mb-3 text-xl flex items-center gap-2">
            {student.name}{" "}
            {student.isActive ? (
              <div className="bg-green-400 h-4 w-4 rounded-full"></div>
            ) : (
              <div className="bg-red-400 h-4 w-4 rounded-full"></div>
            )}
          </h3>
          <div>{getBadge(student.grade)}</div>
          <p className="text-xl">{getStars(student.grade)}</p>
          <p>Rating: {student.grade}</p>
          <p>{student.email}</p>
          <p>{student.age} years old</p>
          <Link href={`/students/${student.id}`}>
            <Button className="w-full mt-5 cursor-pointer" variant={"outline"}>
              View Student Profile
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center h-full">
          <h3 className="text-center mb-3 text-sm">
            Subjects ({student.subjects.length})
          </h3>
          <div className="flex gap-x-1 gap-y-1 w-full max-w-[250px] flex-wrap leading-5 text-xs justify-center">
            {student.subjects.map((subject, index) => (
              <div
                key={index}
                className="dark:bg-gray-900 bg-gray-500 px-3 py-1 rounded-full text-white/80 text-center"
              >
                {subject}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
