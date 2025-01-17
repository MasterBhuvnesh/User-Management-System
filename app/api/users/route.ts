import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("User_Managment");
    const users = await db.collection("Users").find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, owner } = await request.json();
    const client = await clientPromise;
    const db = client.db("User_Managment");
    await db
      .collection("Users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { owner } });
    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
