"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">Welcome User/Owner!</h1>
    </div>
  );
}
