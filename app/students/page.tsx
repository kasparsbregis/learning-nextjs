"use client";
import Sorting from "@/components/Sorting";
import StudentCard from "@/components/StudentCard";
import StudentRadio from "@/components/StudentRadio";
import StudentSelect from "@/components/StudentSelect";
import SubjectsComponent from "@/components/SubjectsComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { students } from "@/data/students";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const StudentsPage = () => {
  const [skolnieki, setSkolnieki] = useState<string>("all");
  const [activity, setActivity] = useState<string>("showAll");
  const [searchParams, setSearchParams] = useState<string>("");
  const [subjectSearch, setSubjectSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("alphabeticallyAZ");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const filteredStudentsByName = students.filter((student) => {
    return student.name.toLowerCase().includes(searchParams.toLowerCase());
  });

  const filteredStudents = filteredStudentsByName.filter((student) => {
    if (skolnieki === "all") {
      return true;
    }
    if (skolnieki === "a") {
      return student.grade >= 90 && student.grade <= 100;
    }
    if (skolnieki === "b") {
      return student.grade >= 80 && student.grade < 90;
    }
    if (skolnieki === "c") {
      return student.grade >= 70 && student.grade < 80;
    }
    if (skolnieki === "d") {
      return student.grade < 70;
    }
  });

  const filteredStudentsByRadio = filteredStudents.filter((student) => {
    if (activity === "showAll") {
      return true;
    }
    if (activity === "active") {
      return student.isActive === true;
    }
    if (activity === "inactive") {
      return student.isActive === false;
    }
  });

  const filteredStudentsBySubject = filteredStudentsByRadio.filter(
    (student) => {
      return student.subjects.some((subject) => {
        return subject.toLowerCase().includes(subjectSearch.toLowerCase());
      });
    }
  );

  const removeFilters = () => {
    setActivity("showAll");
    setSkolnieki("all");
  };

  const deleteSearch = () => setSearchParams("");
  const deleteSubjects = () => setSubjectSearch("");

  let sortedStudents = filteredStudentsBySubject;
  if (sort === "alphabeticallyAZ") {
    sortedStudents = [
      ...filteredStudentsBySubject.sort((a, b) => a.name.localeCompare(b.name)),
    ];
  } else if (sort === "alphabeticallyZA") {
    sortedStudents = [
      ...filteredStudentsBySubject.sort((a, b) => b.name.localeCompare(a.name)),
    ];
  } else if (sort === "byGrade01") {
    sortedStudents = [
      ...filteredStudentsBySubject.sort((a, b) => b.grade - a.grade),
    ];
  } else if (sort === "byGrade10") {
    sortedStudents = [
      ...filteredStudentsBySubject.sort((a, b) => a.grade - b.grade),
    ];
  }

  const filterBySelectedSubject = sortedStudents.filter(
    (student) =>
      selectedSubject === "all" || student.subjects.includes(selectedSubject)
  );

  const totalRating = filterBySelectedSubject.reduce((sum, student) => {
    return sum + student.grade;
  }, 0);
  const averageRating = totalRating / filterBySelectedSubject.length;
  const twoDecimalAverageRating = averageRating.toFixed(2);

  return (
    <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold text-center">
        Showing {filterBySelectedSubject.length} of {students.length} students
      </h1>
      {/* Class average rating */}
      <div className="mt-5 flex flex-col items-center">
        <h1>Selected students&apos; average rating:</h1>
        <h1 className={"font-bold text-5xl text-yellow-600"}>
          {filteredStudentsBySubject.length === 0
            ? "Not Found"
            : twoDecimalAverageRating}
        </h1>
      </div>
      {/* Filter system here */}
      <div className="mt-5 flex flex-col items-center gap-2 border border-white/50 px-6 py-4 rounded-md w-2xl">
        <div className="flex items-center gap-5">
          <h3 className="">Filter students:</h3>
          {(skolnieki !== "all" || activity !== "showAll") && (
            <Button
              variant={"destructive"}
              className="cursor-pointer"
              onClick={removeFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
        <div className="flex gap-10 items-start">
          <div className="flex flex-col gap-4 items-center">
            <h1>By Grades</h1>
            <StudentSelect skolnieki={skolnieki} setSkolnieki={setSkolnieki} />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <h1>By Activity</h1>
            <StudentRadio activity={activity} setActivity={setActivity} />
          </div>
        </div>
      </div>
      {/* Search here */}
      <div className="mt-5 flex items-center gap-10">
        <div className="flex-col flex items-center">
          <h1>Search by name</h1>
          <div className="flex gap-2">
            <Input
              type="text"
              className="w-[250px]"
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
            />
            {searchParams !== "" ? (
              <Button
                variant={"destructive"}
                className="cursor-pointer items-center flex"
                onClick={deleteSearch}
                disabled={false}
                size={"icon"}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant={"destructive"}
                className="cursor-pointer items-center flex"
                onClick={deleteSearch}
                disabled={true}
                size={"icon"}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1>Search by subjects</h1>
          <div className="flex gap-2">
            <Input
              type="text"
              className="w-[250px]"
              value={subjectSearch}
              onChange={(e) => setSubjectSearch(e.target.value)}
            />
            {subjectSearch !== "" ? (
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={deleteSubjects}
                className="cursor-pointer"
                disabled={false}
              >
                <Trash2 />
              </Button>
            ) : (
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={deleteSubjects}
                className="cursor-pointer"
                disabled={true}
              >
                <Trash2 />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="py-5 flex flex-col max-w-2xl w-full items-end px-2 gap-2">
        <Sorting sort={sort} setSort={setSort} />
        <SubjectsComponent
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      </div>
      {/* List of all students */}
      <div className="py-5 flex flex-col gap-4">
        {filterBySelectedSubject.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}

        {filterBySelectedSubject.length === 0 && (
          <div>
            <h1>There are no students that match your filters.</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentsPage;
