import { NextResponse } from "next/server"  
import connectMongo from "@/lib/mongoose";
import UserModel from "@/models/user";
import { generatePythonCodeFromArchitecture } from "@/app/services/generate-structure";
import { Architecture } from "@/lib/schema";

export async function GET(res: Request) {
  try {
    await connectMongo(); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "MongoDB connection failed." }, { status: 500 });
  }

  const exampleArchitecture: Architecture = {
  name: "RISEN Example",
  type: "custom",
  sections: [
    { section_name: "Role", section_description: "Build an AI chatbot using OpenAI API" },
    { section_name: "Instructions", section_description: "Use Next.js and Typescript" },
    { section_name: "Steps", section_description: "Setup project → Create API route → Call OpenAI → Show response" },
    { section_name: "End Goal", section_description: "Chat interface that responds using GPT-4" },
    { section_name: "Narrow", section_description: "Focus only on text-based messages" }
  ]
};

  const data = await generatePythonCodeFromArchitecture(exampleArchitecture);
  return NextResponse.json({ message: data }, { status: 200 });

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
