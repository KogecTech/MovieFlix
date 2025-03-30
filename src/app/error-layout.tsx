import Link from "next/link";

export default function ErrorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4">

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-gray-600 hover:text-[#269B69] text-sm sm:text-base"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="bg-[#269B69] text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base hover:bg-[#218b5e]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center flex-grow px-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}
