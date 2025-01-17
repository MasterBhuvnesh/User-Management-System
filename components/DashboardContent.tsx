"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
  _id: string;
  username: string;
  owner: boolean;
}

export default function DashboardContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const toggleOwnerStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, owner: !currentStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, owner: !currentStatus } : user
        )
      );
    } catch (err) {
      setError("Failed to update user");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-black">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="font-mono font-extrabold text-2xl justify-center self-center">
          User Management Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-[family-name:var(--font-geist-mono)]">
                Username
              </TableHead>
              <TableHead className="font-[family-name:var(--font-geist-mono)]">
                Owner Status
              </TableHead>
              <TableHead className="font-[family-name:var(--font-geist-mono)]">
                Toggle Owner
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.owner && <Badge>Owner</Badge>}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.owner}
                    onCheckedChange={() =>
                      toggleOwnerStatus(user._id, user.owner)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
