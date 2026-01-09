import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return NextResponse.json({
    exists: !!user,
  });
}
