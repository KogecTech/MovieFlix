"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Enable search if we're on "/" or "/movies"
  const isMoviesPage = pathname === "/" || pathname.startsWith("/movies");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/movies?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-300 bg-gray-900">
      {/* Left Section: Title */}
      <div className="flex items-center space-x-8">
        <Link href="/">
          <h1 className="text-xl font-bold bg-[#269B69] text-white px-4 py-2">
            MovieFlix
          </h1>
        </Link>
      </div>

      {/* Right Section: Search + Auth */}
      <div className="flex items-center space-x-6">
        <div className="relative mr-6">
          <SearchBar onSearch={handleSearch} disabled={!isMoviesPage} />
        </div>
        {user ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" className="flex items-center gap-2 border-gray-700">
                {user.displayName || "User"}
                <svg
                  className="w-2 h-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 8.548l-6 6-6-6z" />
                </svg>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="bg-white text-black rounded shadow-lg p-4 whitespace-normal break-words">
                <DropdownMenu.Item asChild>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-lg font-bold hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-lg font-bold hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={handleLogout}
                  className="cursor-pointer px-4 py-2 text-lg font-bold hover:bg-gray-100"
                >
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <div className="flex items-center space-x-6">
            <Link href="/login"> 
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
