import connectMongo from "@/lib/mongoose";
import Prompt from "@/models/prompts";
import { NextResponse } from "next/server";

interface Params {
    slug: string
}

export async function GET(req: Request, { params }: { params: Promise<Params> }) {
    const { slug } = await params;

    if (slug.length === 1) {
        try {
            await connectMongo();
        }
        catch (error) {
            return NextResponse.json({ error: "MongoDB connection failed." }, { status: 500 });
        }

        try {
            const doc = await Prompt.find({ userId: slug[0] }).lean();
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
        catch (error) {
            return NextResponse.json({ error: "Failed to fetch prompt." }, { status: 500 });
        }
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<Params> }) {
    const { slug } = await params;

    if (slug.length === 2) {
        try {
            await connectMongo();
        }
        catch (error) {
            return NextResponse.json({ error: "MongoDB connection failed." }, { status: 500 });
        }

        try {
            const doc = await Prompt.findOneAndDelete({ userId: slug[0], _id: slug[1] })
            if (!doc) {
                return NextResponse.json({ error: "Prompt not found." }, { status: 404 });
            }

            return NextResponse.json({ message: "Prompt deleted succesfully." }, { status: 200 });
        }
        catch (error) {
            return NextResponse.json({ error: "Failed to delete prompt." }, { status: 500 })
        }
    }

}

