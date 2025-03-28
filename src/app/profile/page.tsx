"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.displayName || "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    try {
      await updateProfile(user, { displayName: name });
      // Optionally, display a success message here
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-lg font-medium">
                <span className="font-bold">Email:</span> {user.email}
              </p>
            </div>
            <form onSubmit={handleSave}>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button type="submit" disabled={saving} className="w-full">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
