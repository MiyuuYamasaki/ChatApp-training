import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);

  const user = await prisma.user.findFirst({ where: { id } });
  return NextResponse.json(user);
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const id: number = parseInt(params.id);
  const { name } = await req.json();

  const user = await prisma.user.update({
    data: { name },
    where: { id },
  });
  return NextResponse.json(user);
};