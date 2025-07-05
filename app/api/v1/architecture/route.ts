import connectMongo from "@/lib/mongoose";
import { Architecture, ArchitectureSchema } from "@/lib/schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import ArchitectureModel from "@/models/architecture";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
    try {
        await connectMongo();
    }
    catch (error) {
        return NextResponse.json({ error: "MongoDB connection failed." }, { status: 500 });
    }

    let body: any;
    try {
        body = await req.json();
    }
    catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }


    const parse = ArchitectureSchema.safeParse(body);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let saveData;

    if (parse.data.type === "default") {
        saveData = {
            ...parse.data,
        }
    }
    else {
        saveData = {
            ...parse.data,
            userId: session.user.id
        }
    }


    try {
        const doc = await ArchitectureModel.create(saveData);
        if (!doc) {
            return NextResponse.json({ error: "Failed to create architecture." }, { status: 500 });
        }
        return NextResponse.json({ message: "Architecture created successfully." }, { status: 201 });
    }
    catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Architecture already exists" }, { status: 409 });
        }

        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json({ error: error.message }, { status: 422 });
        }
        return NextResponse.json({ error: "Failed to create architecture." }, { status: 500 });
    }
}




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
            const doc = await ArchitectureModel.find({
                $or: [
                    { userId: session.user.id, type: "custom" },
                    { type: "default" }
                ]
            })
            if (doc.length === 0) {
                return NextResponse.json({ error: "Architectures not found." }, { status: 404 });
            }

            const response = doc.map((item: Architecture) => ({
                _id: item._id,
                name: item.name,
                description: item.description,
                sections: item.sections,
                type: item.type,

            }))
            return NextResponse.json(response, { status: 200 });
        }
        else {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
        }

    }
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch architectures." }, { status: 500 });
    }

}


export async function PUT(req: Request) {
    try {
        await connectMongo();
    }
    catch (error) {
        return NextResponse.json({ error: "MongoDB connection failed." }, { status: 500 });
    }

    let body: any;
    try {
        body = await req.json();
    }
    catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parse = ArchitectureSchema.safeParse(body);
    if (!parse.success) {
        return NextResponse.json({ error: parse.error }, { status: 400 });
    }

    try {
        const session = await getServerSession(authOptions);
        if (session?.user) {
            const doc = await ArchitectureModel.findOneAndUpdate({ _id: parse.data._id, type: "custom", userId: session.user.id }, parse.data);
            if (!doc) {
                return NextResponse.json({ error: "Architecture not found." }, { status: 404 });
            }
            return NextResponse.json({ message: "Architecture updated successfully." }, { status: 200 });
        }
        else {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }

    }
    catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Architecture already exists" }, { status: 409 });
        }

        if (error instanceof mongoose.Error.ValidationError) {
            return NextResponse.json({ error: error.message }, { status: 422 });
        }
        return NextResponse.json({ error: "Failed to update architecture." }, { status: 500 });
    }

}