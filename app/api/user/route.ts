import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic'

export const GET = async (req: Request, res: NextResponse) => {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
    });
    console.log(users);
    return NextResponse.json(users);
}