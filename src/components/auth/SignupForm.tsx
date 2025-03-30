"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-8 w-full bg-white">

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-md mx-auto p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Card for Sign In redirect */}
      <div className="w-[70%] max-w-md mx-auto">
        <Card className="bg-[#269B69] rounded-[20px] shadow-cart-style">
          <CardContent className="flex items-center justify-center h-full p-0">
            <p className="text-xl tracking-[0.70px] leading-5 whitespace-nowrap [font-family:'Segoe_UI-Regular',Helvetica]">
              <span className="text-white tracking-[0.14px]">
                Already have an account?{" "}
              </span>
              <Link href="/login">
                <span className="text-white tracking-[0.14px] cursor-pointer">
                  Login
                </span>
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Signup Form */}
      <div className="w-[70%] max-w-md mx-auto">
        <form onSubmit={handleSignup} className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="font-medium text-[#6F7777] text-base">
              Email Address:
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 !px-4 border-[#B4B4B4]/20 placeholder:text-[#B4B4B4]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="font-medium text-[#6F7777] text-base">
              Username:
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 !px-4 border-[#B4B4B4]/20 placeholder:text-[#B4B4B4]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="font-medium text-[#6F7777] text-base">
              Password:
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 !px-4 border-[#B4B4B4]/20 placeholder:text-[#B4B4B4]"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-[#269B69] text-white h-12 rounded-xl hover:opacity-85 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
}
