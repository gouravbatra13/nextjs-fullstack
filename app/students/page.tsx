"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

type Student = {
    id: number;
    name: string;
    email: string;
    course: string;
};

export default function Students() {

    const [students, setStudents] = useState<Student[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // GET API - Fetch Students
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("/api/students");

                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }

                const result = await response.json();

                setStudents(result.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Add / Update Student
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (editId !== null) {

                // PUT API - Update Student
                const response = await fetch("/api/students", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: editId,
                        name,
                        email,
                        course,
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    alert(result.message);
                    return;
                }

                setStudents((prev) =>
                    prev.map((student) =>
                        student.id === editId ? result.data : student
                    )
                );

                setEditId(null);

            } else {

                // POST API - Add Student
                const response = await fetch("/api/students", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        course,
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    alert(result.message);
                    return;
                }

                setStudents((prev) => [...prev, result.data]);
            }

            setName("");
            setEmail("");
            setCourse("");

        } catch (error) {
            console.error("API Error:", error);
        }
    };

    // Edit Student
    const handleEdit = (student: Student) => {
        setEditId(student.id);
        setName(student.name);
        setEmail(student.email);
        setCourse(student.course);
    };


    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/students?id=${id}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message);
                return;
            }

            setStudents((prev) =>
                prev.filter((student) => student.id !== id)
            );

        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    // Search Student
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
            <h1 className="mb-6 text-3xl font-bold text-blue-600">
                Student Management
            </h1>

            {/* Student Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-8 max-w-lg space-y-4 rounded-lg bg-white p-6 shadow"
            >

                <h2 className="text-xl font-bold">
                    {editId !== null ? "Edit Student" : "Add Student"}
                </h2>

                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded border p-3"
                />

                <input
                    type="email"
                    placeholder="Student Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded border p-3"
                />

                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                    className="w-full rounded border p-3"
                />

                <button
                    type="submit"
                    className="rounded bg-blue-600 px-5 py-2 text-white"
                >
                    {editId !== null ? "Update Student" : "Add Student"}
                </button>

                {editId !== null && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditId(null);
                            setName("");
                            setEmail("");
                            setCourse("");
                        }}
                        className="ml-3 rounded bg-gray-500 px-5 py-2 text-white"
                    >
                        Cancel
                    </button>
                )}

            </form>

            {/* Search */}
            <input
                type="text"
                placeholder="Search student by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-5 w-full max-w-lg rounded border bg-white p-3"
            />

            {loading ? (
                <p className="mb-4 text-blue-600">
                    Loading students...
                </p>
            ) : (
                <>
                    {/* Student List */}
                    <div className="overflow-x-auto rounded-lg bg-white shadow">

                        <table className="w-full text-left">

                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Course</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="border-b">

                                        <td className="p-4">{student.name}</td>
                                        <td className="p-4">{student.email}</td>
                                        <td className="p-4">{student.course}</td>

                                        <td className="space-x-3 p-4">
                                            <button
                                                onClick={() => handleEdit(student)}
                                                className="text-blue-600"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(student.id)}
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                            <Link
                                                href={`/students/${student.id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View 
                                            </Link>
                                        </td>

                                    </tr>
                                ))}

                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-5 text-center text-gray-500">
                                            No students found.
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-gray-600">
                        Total Students: {filteredStudents.length}
                    </p>
                </>
            )}
        </div>
        </>
    );
}