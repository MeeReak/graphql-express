import { useQuery } from "@apollo/client";
import React from "react";
import { Loading } from "./loading";
import { GET_PROJECTS } from "@/queries/projectQueries";
import { IProject, ProjectCard } from "./projectCard";

export const Project = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error loading data...</p>;
  }

  return (
    <>
      <div className="p-4 grid grid-cols-3">
        {" "}
        {data.getAllProject.map((project: IProject) => (
          <ProjectCard
            clientId={project.clientId}
            key={project.id}
            name={project.name}
            description={project.description}
            status={project.status}
            id={project.id}
          />
        ))}
      </div>
    </>
  );
};
