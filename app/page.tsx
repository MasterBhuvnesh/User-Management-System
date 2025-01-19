"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // No token found, redirect to login
      router.push("/auth/login");
      return;
    }

    // Verify the token and fetch user role
    const verifyToken = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error("Token verification failed");
        }

        const { role } = await response.json();

        // Redirect based on role
        if (role === "ROLE_ADMIN") {
          router.push("/dashboard");
        } else if (role === "ROLE_USER" || role === "ROLE_OWNER") {
          router.push("/welcome");
        } else {
          throw new Error("Invalid role");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token"); // Clear invalid token
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return null; // Redirection will happen, so no need to render anything
}
