"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardContent from "@/components/DashboardContent";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const LOGIN_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showError, setShowError] = useState(false); // Manage error state

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      const { timestamp } = JSON.parse(authData);
      if (Date.now() - timestamp < LOGIN_DURATION) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("authData");
      }
    }
  }, []);

  const handleLogin = () => {
    const envUsername = process.env.NEXT_PUBLIC_USERNAME;
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (username === envUsername && password === envPassword) {
      setIsAuthenticated(true);
      localStorage.setItem(
        "authData",
        JSON.stringify({ timestamp: Date.now() })
      );
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setUsername("");
        setPassword("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authData");
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-300 text-white p-8">
        <div className="flex justify-end mb-4">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <DashboardContent />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Login</h1>
        {showError && (
          <Alert
            variant="destructive"
            className="mb-4"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Invalid username or password. Please try again.
            </AlertDescription>
          </Alert>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 mb-2"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
