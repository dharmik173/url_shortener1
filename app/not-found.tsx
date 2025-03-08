export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">404 - Not Found</h1>
      <p className="text-gray-500 mt-2">
        The short URL you entered does not exist.
      </p>
    </div>
  );
}
