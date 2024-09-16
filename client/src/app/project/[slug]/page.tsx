"use client";

import { AlertDialogProject } from "@/components/addProjectModal";
import { DeleteAlert } from "@/components/deletePopup";
import { Loading } from "@/components/loading";
import { DELETE_PROJECT } from "@/mutation/projectMutation";
import { GET_PROJECT, GET_PROJECTS } from "@/queries/projectQueries";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface PageProps {
  params: {
    slug: string;
  };
}

// Function to handle the color of the project status
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-yellow-500 bg-yellow-100";
    case "process":
      return "text-blue-500 bg-blue-100";
    case "done":
      return "text-green-500 bg-green-100";
    default:
      return "text-gray-500 bg-gray-100";
  }
};

export default function Page({ params }: PageProps) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: params.slug },
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: params.slug },
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: (data) => {
      console.log("Project deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleted Project:", error);
    },
  });

  const handleDelete = () => {
    // e.preventDefault(); e: React.FormEvent<HTMLInputElement>
    deleteProject();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error loading data...</p>;
  }

  const project = data.getProjectByID;

  return (
    <div className="max-w-md mx-auto border-white border-2 shadow-md rounded-md p-6 my-8">
      <div className="flex items-center mb-4">
        <Link href={"/"}>
          <button className="bg-green-500 text-white p-2 rounded-full hover:bg-yellow-500 mr-3">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className=" text-white text-xl font-bold">Project Detail</h1>
      </div>

      <h2 className="text-xl font-bold text-white mb-2">{project.name}</h2>
      <p className="text-white mb-4">{project.description}</p>

      <div className="bg-white p-4 rounded-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Project Status
        </h3>
        <p
          className={`${getStatusColor(
            project.status
          )} py-2 px-4 rounded-md mb-4`}
        >
          {project.status}
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Client Information
        </h3>
        <div className="flex items-center mb-2">
          <span className="material-icons font-semibold text-green-500 mr-2">
            Name :
          </span>
          <p className="text-gray-800">{project.client.name}</p>
        </div>
        <div className="flex items-center mb-2">
          <span className="material-icons font-semibold text-green-500 mr-2">
            Email :
          </span>
          <p className="text-gray-800">{project.client.email}</p>
        </div>
        <div className="flex items-center">
          <span className="material-icons font-semibold text-green-500 mr-2">
            Phone:
          </span>
          <p className="text-gray-800">{project.client.phone}</p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <AlertDialogProject updateProject={project} />

        <DeleteAlert handleDelete={handleDelete} />
      </div>
    </div>
  );
}
