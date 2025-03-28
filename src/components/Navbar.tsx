"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-hero-gradient text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        MovieFlix
      </Link>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            {user?.displayName || "User"}
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 8.548l-6 6-6-6z" />
            </svg>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white text-black rounded shadow-lg p-2">
            <DropdownMenu.Item asChild>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={handleLogout}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
}
