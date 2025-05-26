import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   res.status(200).json({ message: `Hello, ${session.user?.name}` });
// }


export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 405});
    }

    const res = {
        name: session.user.name,
        id: session.user.id
    }
    
    return NextResponse.json({message: res}, {status:200})
}