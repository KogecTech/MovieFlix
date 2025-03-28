import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to MovieFlix</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/movies" className="block text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Browse Movies
        </Link>
        <Link href="/login" className="block text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Login
        </Link>
        <Link href="/register" className="block text-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Register
        </Link>
        <Link href="/dashboard" className="block text-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            Dashboard
        </Link>
        <Link href="/profile" className="block text-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Profile
        </Link>
      </div>
    </div>
  );
}
