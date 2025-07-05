import connectMongo from "@/lib/mongoose";
import { NextResponse } from "next/server";
import ArchitectureModel from "@/models/architecture";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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
                const doc = await ArchitectureModel.findOneAndDelete({ _id: slug[0], type: "custom", userId: session?.user.id });

                if (!doc) {
                    return NextResponse.json({ error: "Architecture not found." }, { status: 404 });
                }
                return NextResponse.json({ message: "Architecture deleted successfully." }, { status: 200 });
            }
            catch (error) {
                return NextResponse.json({ error: "Failed to delete architecture." }, { status: 500 });
            }
        }
        else {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
        }
    }
    else {
        return NextResponse.json({ error: "Invalid url format." }, { status: 400 });
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
        const session = await getServerSession(authOptions);
        if (session?.user) {
            try {
                const doc = await ArchitectureModel.findOne({ name: slug[0], type: "custom", userId: session?.user.id });

                if (!doc) {
                    return NextResponse.json({ error: "Architecture not found." }, { status: 404 });
                }
                return NextResponse.json(doc, {status:200}); 
            }
            catch (error) {
                return NextResponse.json({ error: "Failed to delete architecture." }, { status: 500 });
            }
        }
        else {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
        }
    }
    else {
        return NextResponse.json({ error: "Invalid url format." }, { status: 400 });
    }
}
