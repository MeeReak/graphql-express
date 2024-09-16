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
      <div className="border border-green-300 rounded-lg p-4 shadow-md max-w-xs bg-green-50 cursor-pointer">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-green-800">
            {project.name}
          </h3>
          <button className="bg-green-500 text-white text-sm py-1 px-3 rounded-full hover:bg-green-600 focus:outline-none">
            View
          </button>
        </div>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Status:</span>
          <span className="text-green-700 font-semibold">
            {" "}
            {project.status}
          </span>
        </p>
      </div>
    </Link>
  );
};
