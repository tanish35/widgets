"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackList } from "@/app/(app)/dashboard/FeedbackList";

interface Feedback {
  id: number;
  message: string;
  type: "Bug" | "Feature" | "Other";
}

interface Project {
  id: string;
  name: string;
  projectKey: string;
  createdAt: Date;
  feedbacks: Feedback[];
}

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Bug" | "Feature" | "Other"
  >("All");

  const embedSnippet = `<script src="${process.env.NEXT_PUBLIC_APP_URL}/widget.js" data-project-key="${project.projectKey}"></script>`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const filteredFeedbacks =
    activeFilter === "All"
      ? project.feedbacks
      : project.feedbacks.filter((f) => f.type === activeFilter);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {project.name}
          </h2>
          <Button
            variant="destructive"
            size="sm"
            className="mt-2 bg-red-600 hover:bg-red-700"
          >
            Delete Project
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-md bg-background px-3 py-2">
          <code className="font-mono text-sm text-muted-foreground">
            {project.projectKey}
          </code>
          <button className="text-xs text-primary hover:underline">Copy</button>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground">Embed Snippet</h3>
        <div className="mt-4 rounded-md bg-background p-3">
          <code className="font-mono text-xs text-muted-foreground">
            {embedSnippet}
          </code>
        </div>
        <Button
          onClick={handleCopySnippet}
          variant="outline"
          size="sm"
          className="mt-3 bg-transparent"
        >
          {copiedSnippet ? "✓ Copied" : "Copy snippet"}
        </Button>
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground">Feedback</h3>
        <div className="mt-4 flex gap-2 border-b border-border">
          {(["All", "Bug", "Feature", "Other"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {filteredFeedbacks.length > 0 ? (
            <FeedbackList feedbacks={filteredFeedbacks} />
          ) : (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No feedback yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
