"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackList } from "@/app/(app)/dashboard/FeedbackList";
import api from "@/lib/api";

interface Feedback {
  id: string;
  message: string;
  type: "Bug" | "Feature" | "Other";
  sentiment?: "Positive" | "Neutral" | "Negative";
}

interface Project {
  id: string;
  name: string;
  projectKey: string;
  createdAt: Date;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Bug" | "Feature" | "Other"
  >("All");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedbacksLoading, setFeedbacksLoading] = useState(false);

  const embedSnippet = `<script src="${process.env.NEXT_PUBLIC_APP_URL}/widget.js" data-project-key="${project.projectKey}"></script>`;

  const fetchFeedbacks = async (page = 1, type?: string) => {
    setFeedbacksLoading(true);
    try {
      const params = new URLSearchParams({
        projectKey: project.projectKey,
        page: page.toString(),
        limit: "3",
      });

      if (type && type !== "All") {
        params.append("type", type);
      }

      const response = await api.get(`/get-feedbacks?${params}`);
      setFeedbacks(response.data.feedbacks);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setFeedbacksLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(1, activeFilter);
  }, [project.projectKey, activeFilter]);

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleDeleteProject = async () => {
    setLoading(true);
    await api.delete("/delete-project", {
      data: { projectKey: project.projectKey },
    });
    setLoading(false);
    window.location.reload();
  };

  const handleFilterChange = (filter: "All" | "Bug" | "Feature" | "Other") => {
    setActiveFilter(filter);
  };

  const handlePageChange = (page: number) => {
    fetchFeedbacks(page, activeFilter);
  };

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
            onClick={handleDeleteProject}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Project"}
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
              onClick={() => handleFilterChange(filter)}
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
          {feedbacksLoading ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Loading feedbacks...
            </p>
          ) : feedbacks.length > 0 ? (
            <FeedbackList
              feedbacks={feedbacks}
              pagination={pagination}
              onPageChange={handlePageChange}
              onFeedbackUpdate={fetchFeedbacks}
            />
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
