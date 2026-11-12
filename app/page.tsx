import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold text-blue-600">
         {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>

        <p className="mt-3 text-gray-600">
          Welcome to {process.env.NEXT_PUBLIC_APP_NAME}!
        </p>

        {/* <button className="mt-5 rounded bg-blue-600 px-5 py-2 text-white">
          Add Student
        </button> */}
      </div>
    </>
  );
}