import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "@/lib/auth-server";
import { nanoid } from "nanoid";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "Invalid project name" },
      { status: 400 }
    );
  }
  const projectKey = `${slugify(name)}_${nanoid(8)}`;
  const newProject = await prisma.project.create({
    data: {
      name,
      projectKey,
      userId: session.user.id,
    },
  });
  const allData = await prisma.project.findUnique({
    where: { id: newProject.id },
    include: {
      feedbacks: true,
    },
  });
  return NextResponse.json(allData, { status: 201 });
}
