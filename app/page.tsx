"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    router.push("/auth/login"); // Redirect to login page
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-300 text-white p-8">
      <div className="flex justify-end mb-4">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <DashboardContent />
    </div>
  );
}
