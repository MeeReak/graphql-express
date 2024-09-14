"use client";

import { Loading } from "@/components/loading";
import { GET_PROJECT } from "@/queries/projectQueries";
import { useQuery } from "@apollo/client";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: params.slug },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <p>Error loading project data...{params.slug}</p>;
  }

  const project = data.getProjectByID;
  console.log(project.client.name);
  // Render the project details if data is successfully fetched
  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <p>Status: {project.status}</p>
      <p>Name: {project.client.name}</p>
      <p>Email: {project.client.email}</p>
      <p>Phone: {project.client.phone}</p>
    </div>
  );
}
