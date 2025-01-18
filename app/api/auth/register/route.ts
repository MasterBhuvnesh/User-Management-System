import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json();
    const client = await clientPromise;
    const db = client.db("User_Managment");

    // Check if user already exists
    const existingUser = await db.collection("Customers").findOne({ name });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user with default role
    await db.collection("Customers").insertOne({
      name,
      password: hashedPassword,
      role: "ROLE_USER", // Default role
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
