import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">

        <h1 className="text-xl font-bold">
          Student App
        </h1>

        <div className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/students">Students</Link>
          <Link href="/about">About</Link>
        </div>

      </div>
    </nav>
  );
}