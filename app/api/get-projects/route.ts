import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-server";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await sleep(2000);
  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      projectKey: true,
      createdAt: true,
    },
  });
  return NextResponse.json(projects);
}
