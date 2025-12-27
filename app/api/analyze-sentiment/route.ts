import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { feedbackId } = await req.json();

  const feedback = await prisma.feedback.findUnique({
    where: { id: feedbackId },
  });

  if (!feedback) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `
Classify the sentiment of the following text.
Respond with exactly one word: positive, neutral, or negative.

Text:
"${feedback.message}"
    `.trim(),
  });

  const sentiment1 = text.trim().toLowerCase();
  const sentiment = sentiment1[0].toUpperCase() + sentiment1.slice(1);

  await prisma.feedback.update({
    where: { id: feedbackId },
    data: { sentiment },
  });

  return NextResponse.json({ sentiment });
}
