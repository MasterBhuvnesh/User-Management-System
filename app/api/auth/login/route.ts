import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json();

    console.log("Login request received:", { name, password }); // Debugging

    if (!name || !password) {
      return NextResponse.json(
        { error: "Name and password are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("User_Managment");

    // Find the user by name
    const user = await db.collection("Customers").findOne({ name });
    console.log("User found in database:", user); // Debugging

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid); // Debugging

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    console.log("Token generated:", token); // Debugging

    // Return token, role, and name
    return NextResponse.json(
      { token, role: user.role, name: user.name },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error); // Debugging
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
