import { NextResponse } from "next/server"  
import connectMongo from "@/lib/mongoose";
import UserModel from "@/models/user";

export async function GET(res: Request) {
  try {
    await connectMongo(); 
    return NextResponse.json({ message: "MongoDB connection successful." }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "MongoDB connection failed." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);
    await connectMongo();
const doc = await UserModel.findOne({ _id: data.id }).lean();
    if (!doc) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    console.log(doc);
    return NextResponse.json({ message: doc }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to process data." }, { status: 500 });
  }
}
