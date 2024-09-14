"use client";

import { AlertDialogDemo } from "@/components/addClientModal";
import { AlertDialogProject } from "@/components/addProjectModal";
import { Client } from "@/components/client";
import { Project } from "@/components/project";

export default function Home() {
  return (
    <div className=" space-y-5 w-[80%] mx-auto">
      <AlertDialogDemo />
      <AlertDialogProject />
      <Project />
      <Client />
    </div>
  );
}
