export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

        <p className="text-lg text-center font-semibold text-blue-600">
          Loading Students...
        </p>
      </div>
    </div>
  );
}