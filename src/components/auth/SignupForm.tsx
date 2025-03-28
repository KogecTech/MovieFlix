"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const [email, setEmail] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here.
          </Link>
        </p>
      </form>
    </div>
  );
}
