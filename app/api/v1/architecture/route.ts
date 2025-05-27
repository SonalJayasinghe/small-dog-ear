import connectMongo from "@/lib/mongoose";
import { ArchitectureSchema } from "@/lib/schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import ArchitectureModel from "@/models/architecture";

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


    try {
        const doc = await ArchitectureModel.create(parse.data);
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

    const doc = await ArchitectureModel.find({ type: "default" }).sort({ createdAt: -1 }).exec();
    if (doc.length === 0) {
        return NextResponse.json({ error: "Architecture not found." }, { status: 404 });
    }

    const response = doc.map((item) => ({
        name: item.name,
        sections: item.sections,
        type: item.type,
    }))

    return NextResponse.json(response, { status: 200 });
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
        const doc = await ArchitectureModel.findOneAndUpdate({ name: parse.data.name, type: "custom", userId: parse.data.userId }, parse.data);
        if (!doc) {
            return NextResponse.json({ error: "Architecture not found." }, { status: 404 });
        }
        return NextResponse.json({ message: "Architecture updated successfully." }, { status: 200 });
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