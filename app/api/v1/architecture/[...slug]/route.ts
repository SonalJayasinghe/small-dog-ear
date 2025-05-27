import connectMongo from "@/lib/mongoose";
import { NextResponse } from "next/server";
import ArchitectureModel from "@/models/architecture";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { error } from "console";

interface Params {
    slug: string;
}

export async function DELETE(req: Request, { params }: { params: Promise<Params> }) {
    try {
        await connectMongo();
    }
    catch (error) {
        return NextResponse.json({ error: "MongoDB connection failed." }, { status: 500 });
    }

    const { slug } = await params;

    if (slug.length === 1) {
        const session = await getServerSession(authOptions);
        if (session?.user) {
            try {
                const doc = await ArchitectureModel.findOneAndDelete({ name: slug[0], type: "custom", userId: session?.user.id });

                if (!doc) {
                    return NextResponse.json({ error: "Architecture not found." }, { status: 404 });
                }
                return NextResponse.json({ message: "Architecture deleted successfully." }, { status: 200 });
            }
            catch (error) {
                return NextResponse.json({ error: "Failed to delete architecture." }, { status: 500 });
            }
        }
        else{
            return NextResponse.json({error: "Unauthorized."}, {status: 401})
        }
    }
    else{
        return NextResponse.json({error: "Invalid url format."}, {status: 400});
    }



}


export async function GET(req: Request, { params }: { params: Promise<Params> }) {
    try {
        await connectMongo();
    }
    catch (error) {
        return NextResponse.json({ error: "MongoDB connection failed." }, { status: 500 });
    }

    const { slug } = await params;
    if (slug.length === 1) {
        try {
            const doc = await ArchitectureModel.find({
                $or: [
                    { userId: slug[0], type: "custom" },
                    { type: "default" }
                ]
            })
            if (doc.length === 0) {
                return NextResponse.json({ error: "Architectures not found." }, { status: 404 });
            }

            const response = doc.map((item) => ({
                name: item.name,
                sections: item.sections,
                type: item.type,

            }))
            return NextResponse.json(response, { status: 200 });
        }
        catch (error) {
            return NextResponse.json({ error: "Failed to fetch architectures." }, { status: 500 });
        }
    }
}