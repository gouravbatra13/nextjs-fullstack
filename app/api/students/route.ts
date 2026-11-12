import { NextResponse } from "next/server";

let students = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    course: "MCA",
  },
  {
    id: 2,
    name: "Amit Kumar",
    email: "amit@gmail.com",
    course: "BCA",
  },
];

// GET Fetch students
export async function GET() {
  return NextResponse.json({
    success: true,
    data: students,
  });
}

// POST Add student
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.course) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newStudent = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      course: body.course,
    };

    students.push(newStudent);

    return NextResponse.json(
      {
        success: true,
        message: "Student added successfully",
        data: newStudent,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}

// PUT Update student
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const id = Number(body.id);

    const studentIndex = students.findIndex(
      (student) => student.id === id
    );

    if (studentIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    students[studentIndex] = {
      ...students[studentIndex],
      name: body.name,
      email: body.email,
      course: body.course,
    };

    return NextResponse.json({
      success: true,
      message: "Student updated successfully",
      data: students[studentIndex],
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}


// DELETE Delete student
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = Number(searchParams.get("id"));

  const existingStudent = students.find(
    (student) => student.id === id
  );

  if (!existingStudent) {
    return NextResponse.json(
      { success: false, message: "Student not found" },
      { status: 404 }
    );
  }

  students = students.filter(
    (student) => student.id !== id
  );

  return NextResponse.json({
    success: true,
    message: "Student deleted successfully",
  });
}