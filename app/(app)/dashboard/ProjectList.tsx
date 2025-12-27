"use client";

import { formatDate } from "@/lib/date-utils";

export interface Project {
  id: string;
  name: string;
  projectKey: string;
  createdAt: Date;
}

interface ProjectsListProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
}

export function ProjectsList({
  projects,
  selectedProjectId,
  onSelectProject,
}: ProjectsListProps) {
  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelectProject(project.id)}
          className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
            selectedProjectId === project.id
              ? "border-primary bg-primary/5"
              : "border-border hover:bg-card"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{project.name}</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {project.projectKey}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Created {formatDate(project.createdAt)}
          </p>
        </button>
      ))}
    </div>
  );
}
