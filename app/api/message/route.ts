import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: NextResponse) => {
    const { content, authorId, published } = await req.json();
  
    const new_message = await prisma.message.create({
      data: {
        content,
        authorId,
        published,
      },
    });
    return NextResponse.json(new_message);
  }

  export const GET = async (req: Request, res: NextResponse) => {
    const messages = await prisma.message.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(messages);
}

/* export const PUT = async (
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
}; */
