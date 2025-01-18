import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("User_Managment");

    // Fetch all customers except admins
    const customers = await db
      .collection("Customers")
      .find({ role: { $ne: "ROLE_ADMIN" } })
      .toArray();

    return NextResponse.json(customers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const { id, role } = await request.json();
    const client = await clientPromise;
    const db = client.db("User_Managment");

    // Update the customer's role
    await db
      .collection("Customers")
      .updateOne({ _id: new ObjectId(id) }, { $set: { role } });

    return NextResponse.json({ message: "Role updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
