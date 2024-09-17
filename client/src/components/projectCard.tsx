import Link from "next/link";
import React from "react";

export interface IProject {
  id?: string;
  name: string;
  description: string;
  status: string;
  clientId: string;
  client?: {
    id: string;
  };
}

export const ProjectCard = (project: IProject) => {
  return (
    <Link href={`/project/${project.id}`}>
      <div className="border border-green-500 rounded-lg p-4 shadow-md max-w-xs cursor-pointer">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <button className="border-green-500 border text-green-500 hover:bg-green-500 hover:text-white py-1 px-2 rounded-lg">
            View
          </button>
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-white">Status:</span>
          <span className="text-green-500 font-semibold">
            {" "}
            {project.status}
          </span>
        </p>
      </div>
    </Link>
  );
};
