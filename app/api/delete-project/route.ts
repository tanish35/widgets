import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "@/lib/auth-server";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectKey } = await req.json();

  const feedbacks = await prisma.feedback.deleteMany({
    where: {
      project: {
        projectKey,
        userId: session.user.id,
      },
    },
  });

  await prisma.project.delete({
    where: {
      projectKey,
      userId: session.user.id,
    },
  });

  return NextResponse.json({
    success: true,
    deletedFeedbacks: feedbacks.count,
  });
}
