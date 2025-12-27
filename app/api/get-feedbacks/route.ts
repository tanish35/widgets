import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectKey = searchParams.get("projectKey");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "3");
  const type = searchParams.get("type");

  if (!projectKey) {
    return NextResponse.json(
      { error: "Project key is required" },
      { status: 400 }
    );
  }
  const project = await prisma.project.findFirst({
    where: {
      projectKey,
      userId: session.user.id,
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const skip = (page - 1) * limit;
  const whereClause: any = {
    projectId: project.id,
  };

  if (type && type !== "All") {
    whereClause.type = type;
  }
  const totalCount = await prisma.feedback.count({
    where: whereClause,
  });
  const feedbacks = await prisma.feedback.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return NextResponse.json({
    feedbacks,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  });
}
