import connectMongo from "@/lib/mongoose";
import Architecture from "@/models/architecture";

export async function DELETE(req: Request, { params }: { params: { name: string } }) {
    try {
        await connectMongo();
    }
    catch (error) {
        return new Response("MongoDB connection failed.", { status: 500 });
    }
 
    try {
        const doc = await Architecture.findOneAndDelete({ name: params.name });
        if (!doc) {
            return new Response("Architecture not found.", { status: 404 });
        }
        return new Response("Architecture deleted successfully.", { status: 200 });
    }
    catch (error) {
        return new Response("Failed to delete architecture.", { status: 500 });
    }
}