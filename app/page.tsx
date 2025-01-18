"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Dashboard - Token:", token); // Debugging

    if (!token) {
      console.log("No token found, redirecting to login"); // Debugging
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-300 text-white p-8">
      <DashboardContent />
    </div>
  );
}
