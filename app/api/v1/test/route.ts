import { NextResponse } from "next/server"  
import connectMongo from "@/lib/mongoose";

export async function GET(res: Request) {
  try {
    await connectMongo(); 
    return NextResponse.json({ message: "MongoDB connection successful." });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "MongoDB connection failed." }, { status: 500 });
  }
}
