import Navbar from "../components/Navbar";

export default function About() {

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-blue-600">
        About Student App
      </h1>

      <p className="mt-4 text-gray-700">
        This application is built using Next.js.
      </p>

    </div>
    </>
  );
}