import connectMongo from "@/lib/mongoose";
import { PromptSchema } from "@/lib/schema";
import Prompt from "@/models/prompts";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try{
        await connectMongo();
    }
    catch(error){
        return NextResponse.json({error: "Failed to connect to MongoDB"}, {status: 500});
    }

    const data = await req.json();
    
    
    const parse = PromptSchema.safeParse(data);
    if(!parse.success){
        return NextResponse.json({error: parse.error}, {status: 400});
    }

    try{
        const doc = await Prompt.create(parse.data);
        if(!doc){
            return NextResponse.json({error: "Failed to create prompt"}, {status: 500});
        }
        return NextResponse.json({message: "Prompt created successfully"}, {status: 201});
        
    }
    catch(error){
        return NextResponse.json({error: "Failed to parse data"}, {status: 400});
    }    

}