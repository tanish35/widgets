"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import api from "@/lib/api";

interface Feedback {
  id: string;
  message: string;
  type: "Bug" | "Feature" | "Other";
  sentiment?: "Positive" | "Neutral" | "Negative";
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  const [data, setData] = useState<Feedback[]>(feedbacks);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Bug":
        return "bg-red-500/10 text-red-600";
      case "Feature":
        return "bg-blue-500/10 text-blue-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-500/10 text-green-600";
      case "Neutral":
        return "bg-yellow-500/10 text-yellow-600";
      case "Negative":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  async function analyzeSentiment(feedbackId: string) {
    setLoadingId(feedbackId);
    try {
      const response = await api.post("/analyze-sentiment", { feedbackId });
      const updatedData = data.map((item) =>
        item.id === feedbackId
          ? { ...item, sentiment: response.data.sentiment }
          : item
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Message</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Sentiment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((feedback) => (
          <TableRow key={feedback.id}>
            <TableCell className="max-w-xs whitespace-normal wrap-break-word">
              {feedback.message}
            </TableCell>
            <TableCell>
              <span
                className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${getBadgeColor(
                  feedback.type
                )}`}
              >
                {feedback.type}
              </span>
            </TableCell>
            <TableCell>
              {feedback.sentiment ? (
                <span
                  className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${getSentimentColor(
                    feedback.sentiment
                  )}`}
                >
                  {feedback.sentiment}
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-green-500"
                  onClick={() => analyzeSentiment(feedback.id)}
                >
                  {loadingId === feedback.id
                    ? "Analyzing..."
                    : "Analyze Sentiment"}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
