"use client";

import { useState, useEffect } from "react";
import { ProjectsList } from "@/app/(app)/dashboard/ProjectList";
import { ProjectDetails } from "@/app/(app)/dashboard/ProjectDetails";
import { AddProjectModal } from "@/app/(app)/dashboard/AddProject";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import Preloader from "@/components/ui/preloader";
import { Project } from "@/app/(app)/dashboard/ProjectList";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await api.get("/get-projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleAddProject = async (name: string) => {
    setLoading(true);
    const response = await api.post("/add-project", { name });
    const newProject = response.data;
    setProjects([...projects, newProject]);
    setSelectedProjectId(newProject.projectKey);
    setIsAddModalOpen(false);
    setLoading(false);
  };

  if (loading && projects.length === 0) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 py-4 md:px-8 md:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Projects</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your feedback widgets
            </p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            + Add Project
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <ProjectsList
              projects={projects}
              selectedProjectId={selectedProjectId}
              onSelectProject={setSelectedProjectId}
            />
          </div>

          <div className="md:col-span-2">
            {selectedProject ? (
              <ProjectDetails project={selectedProject} />
            ) : (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  Select a project to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProject}
        loading={loading}
      />
    </div>
  );
}
