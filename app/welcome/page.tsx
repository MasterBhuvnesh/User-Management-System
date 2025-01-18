"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (!token) {
      router.push("/auth/login");
    } else {
      setUserName(name || "User");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-300 text-white p-8">
      <div className="flex justify-end mb-4">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <h1 className="text-4xl font-bold text-white">Welcome, {userName}!</h1>
    </div>
  );
}
