"use client";

interface Feedback {
  id: number;
  message: string;
  type: "Bug" | "Feature" | "Other";
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
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

  return (
    <div className="space-y-3">
      {feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="rounded-md border border-border bg-background p-3"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-foreground">{feedback.message}</p>
            <span
              className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${getBadgeColor(
                feedback.type
              )}`}
            >
              {feedback.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
