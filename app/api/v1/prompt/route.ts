import connectMongo from "@/lib/mongoose";
import { PromptSchema } from "@/lib/schema";
import Prompt from "@/models/prompts";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        await connectMongo();
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
    }

    const data = await req.json();


    const parse = PromptSchema.safeParse(data);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error }, { status: 400 });
    }

    try {
        const doc = await Prompt.create(parse.data);
        if (!doc) {
            return NextResponse.json({ error: "Failed to create prompt" }, { status: 500 });
        }
        return NextResponse.json({ message: "Prompt created successfully" }, { status: 201 });

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to parse data" }, { status: 400 });
    }

}


export async function PUT(req: Request) {
    try {
        await connectMongo();
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 })
    }

    let data;
    try {
        data = await req.json();
    }
    catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    }
    const parse = PromptSchema.safeParse(data);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error }, { status: 400 });
    }

    try {
        const doc = await Prompt.findByIdAndUpdate(data.id, parse.data);
        if (!doc) {
            return NextResponse.json({ error: "Prompt not found." }, { status: 404 });
        }
        return NextResponse.json({ message: "Prompt updated successfully." }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to update architecture." }, { status: 500 });
    }
}