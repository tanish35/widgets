"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  loading: boolean;
}

export function AddProjectModal({
  isOpen,
  onClose,
  onAdd,
  loading,
}: AddProjectModalProps) {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      onAdd(projectName.trim());
      setProjectName("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-foreground">Add Project</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., My Website"
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Adding..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
