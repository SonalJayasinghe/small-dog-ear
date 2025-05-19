import connectMongo from "@/lib/mongoose";
import { ArchitectureSchema } from "@/lib/schema";
import Architecture from "@/models/architecture";
import mongoose from "mongoose";

export async function POST(req: Request) {
    try {
        await connectMongo();
    }
    catch (error) {
        return new Response("MongoDB connection failed.", { status: 500 });
    }

    let body: any;
    try {
        body = await req.json();
    }
    catch (error) {
        return new Response("Invalid JSON", { status: 400 });
    }


    const parse = ArchitectureSchema.safeParse(body);
    if (!parse.success) {
        return new Response(JSON.stringify(parse.error), { status: 400 });
    }


    try {
        const doc = await Architecture.create(parse.data);
        return new Response("Architecture created successfully.", { status: 201 });
    }
    catch (error: any) {
        if (error.code === 11000) {
            return new Response("Architecture already exists.", { status: 409 });
        }

        if (error instanceof mongoose.Error.ValidationError) {
            return new Response("Validation error: " + error.message, { status: 422 });
        }
        return new Response("Failed to create architecture.", { status: 500 });
    }
}


export async function GET(req: Request){
    try{
        await connectMongo();
    }
    catch (error) {
        return new Response("MongoDB connection failed.", { status: 500 });
    }

    const architectures = await Architecture.find({type: "default"}).sort({ createdAt: -1 }).exec();
    if (architectures.length === 0) {
        return new Response("No architectures found.", { status: 404 });
    }
    return new Response(JSON.stringify(architectures), { status: 200 });
}

