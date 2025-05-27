import connectMongo from "@/lib/mongoose";
import { NextResponse } from "next/server";
import PromptModel from "@/models/prompts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface Params {
    slug: string
}


export async function DELETE(req: Request, { params }: { params: Promise<Params> }) {
    const { slug } = await params;

    if (slug.length === 1) {
        try {
            await connectMongo();
        }
        catch (error) {
            return NextResponse.json({ error: "MongoDB connection failed." }, { status: 500 });
        }

        try {
            const session = await getServerSession(authOptions);
            if (session?.user) {
                const doc = await PromptModel.findOneAndDelete({ userId: session.user.id, _id: slug[1] })
                if (!doc) {
                    return NextResponse.json({ error: "Prompt not found." }, { status: 404 });
                }

                return NextResponse.json({ message: "Prompt deleted succesfully." }, { status: 200 });
            }
            else {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

        }
        catch (error) {
            return NextResponse.json({ error: "Failed to delete prompt." }, { status: 500 })
        }
    }
    else {
        return NextResponse.json({ error: "Invalid url format." }, { status: 400 });
    }

}

