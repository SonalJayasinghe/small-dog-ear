import { authOptions } from "@/lib/authOptions";
import connectMongo from "@/lib/mongoose";
import { PromptSchema } from "@/lib/schema";
import PromptModel from "@/models/prompts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(req: Request) {

    try {
        await connectMongo();
    }
    catch (error) {
        return NextResponse.json({ error: "MongoDB connection failed." }, { status: 500 });
    }

    try {
        const session = await getServerSession(authOptions);
        if (session?.user) {
            const doc = await PromptModel.find({ userId: session.user.id }).lean();
            if (!doc) {
                return NextResponse.json({ error: "Prompt not found." }, { status: 404 });
            }

            if (doc.length === 0) {
                return NextResponse.json({ error: "Prompt not found." }, { status: 404 });
            }

            const response = doc.map((item) => {
                return {
                    id: item._id,
                    promptName: item.promptName,
                    promptDescription: item.promptDescription,
                    prompt: item.prompt.map((section: { sectionName: string; sectionPrompt: string; subsections: any[]; }) => ({
                        sectionName: section.sectionName,
                        sectionPrompt: section.sectionPrompt,
                        subsections: section.subsections.map((subsection) => ({
                            subsectionName: subsection.subsectionName,
                            subsectionPrompt: subsection.subsectionPrompt
                        }))
                    })),
                };
            });

            return NextResponse.json(response, { status: 200 });
        }

        else {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch prompt." }, { status: 500 });
    }

}



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
        const doc = await PromptModel.create(parse.data);
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
        const doc = await PromptModel.findByIdAndUpdate(data.id, parse.data);
        if (!doc) {
            return NextResponse.json({ error: "Prompt not found." }, { status: 404 });
        }
        return NextResponse.json({ message: "Prompt updated successfully." }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to update architecture." }, { status: 500 });
    }
}