import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (
    req: Request,
    { params }: { params: { id: string } },
    res: NextResponse
  ) => {
    const id: number = parseInt(params.id);
    const { published } = await req.json();
  
    const user = await prisma.message.update({
      data: { published },
      where: { id },
    });
    return NextResponse.json(user);
  };