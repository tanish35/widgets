import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { projectKey, type, text } = await req.json();

  const project = await prisma.project.findUnique({
    where: { projectKey },
  });

  if (!project) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  await prisma.feedback.create({
    data: {
      projectId: project.id,
      type,
      message: text,
    },
  });

  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
