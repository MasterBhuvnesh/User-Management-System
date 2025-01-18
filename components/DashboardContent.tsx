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

interface Customer {
  _id: string;
  name: string;
  role: string; // "ROLE_USER", "ROLE_OWNER", or "ROLE_ADMIN"
}

export default function DashboardContent() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  // Toggle role between ROLE_USER and ROLE_OWNER
  const toggleRole = async (id: string, currentRole: string) => {
    const newRole = currentRole === "ROLE_USER" ? "ROLE_OWNER" : "ROLE_USER";
    try {
      const response = await fetch("/api/customers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      // Update local state
      setCustomers(
        customers.map((customer) =>
          customer._id === id ? { ...customer, role: newRole } : customer
        )
      );
    } catch (err) {
      setError("Failed to update role");
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className=" font-[family-name:var(--font-geist-mono)] text-2xl justify-center self-center">
          Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-[family-name:var(--font-geist-mono)]">
                Name
              </TableHead>
              <TableHead className="font-[family-name:var(--font-geist-mono)]">
                Role
              </TableHead>
              <TableHead className="font-[family-name:var(--font-geist-mono)]">
                Toggle Role
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-[family-name:var(--font-geist-mono)]">
            {customers.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  {customer.role === "ROLE_OWNER" && <Badge>Owner</Badge>}
                  {customer.role === "ROLE_USER" && (
                    <Badge variant="outline">User</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={customer.role === "ROLE_OWNER"}
                    onCheckedChange={() =>
                      toggleRole(customer._id, customer.role)
                    }
                    disabled={customer.role === "ROLE_ADMIN"} // Disable switch for admins
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
