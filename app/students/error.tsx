"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-3 text-2xl font-bold text-red-600">
        Something went wrong!
      </h2>

      <p className="mb-4 text-gray-600">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  );
}