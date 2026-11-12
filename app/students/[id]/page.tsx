"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import NotFound from "../not-found";
import Loading from "./loading";
type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

export default function StudentDetails() {
  const params = useParams();
  const id = Number(params.id);

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch("/api/students");
        const result = await response.json();

        const foundStudent = result.data.find(
          (item: Student) => item.id === id
        );

        setStudent(foundStudent || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <Loading />;

  if (!student) return <NotFound />;

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-lg bg-white text-black p-6 shadow">
        <h1 className="mb-5 text-2xl font-bold">
          Student Details
        </h1>

        <p><b>ID:</b> {student.id}</p>
        <p><b>Name:</b> {student.name}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Course:</b> {student.course}</p>
      </div>
    </div>
    </>
  );
}