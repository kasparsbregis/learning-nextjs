import StudentProfile from "@/components/StudentProfile";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { students } from "@/data/students";

const StudentPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const studentId = Number(id);
  const student = students.find((s) => s.id === studentId);

  return (
    <section className="flex flex-col h-[calc(100vh-3.5rem)] pt-20 ">
      <Link href={"/students"} className="w-fit flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to All Students
      </Link>
      {!student ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          Student not found
        </div>
      ) : (
        <div className="flex flex-col items-center ">
          <h1 className="text-3xl font-bold text-center">Student Profile</h1>
          <StudentProfile student={student} />
        </div>
      )}
    </section>
  );
};

export default StudentPage;
