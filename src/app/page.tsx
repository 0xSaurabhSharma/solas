"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create)

  return (
    <main className="flex flex-col gap-2 p-4">

      <Button
      onClick={()=> createProject({
        name: "test3"
      })}
      >
        Add Project
      </Button>

      {projects?.map((project) => <div 
      key={project._id}
      className="border-2 py-2 px-4 rounded-2xl"
      >
        <h3>
        {project.name}
        </h3>
        <p>OwnerId: {`${project.ownerId}`}</p>
        </div>)}
    </main>
  );
}
