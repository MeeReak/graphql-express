"use client";

import { useParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTasks } from "react-icons/fa";
import { InputWithLabel } from "./inputWithLabel";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { SelectDemo } from "./selectDemo";
import { Loading } from "./loading";
import { CREATE_PROJECT, UPDATE_PROJECT } from "@/mutation/projectMutation";
import { GET_PROJECT, GET_PROJECTS } from "@/queries/projectQueries";
import { IProject } from "./projectCard";
import { TextareaDemo } from "./areaInput";

export function AlertDialogProject({
  updateProject,
}: {
  updateProject?: IProject;
}) {
  const [project, setProject] = useState({
    name: updateProject ? updateProject.name : "",
    description: updateProject ? updateProject.description : "",
    status: updateProject ? updateProject.status : "",
    clientId: updateProject ? updateProject.client!.id : "",
  });

  const [createProject] = useMutation(CREATE_PROJECT, {
    variables: {
      name: project.name,
      description: project.description,
      status: project.status,
      clientId: project.clientId,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: (data) => {
      console.log("Project created successfully:", data);
      // Optionally reset the form or provide user feedback
      setProject({ name: "", description: "", status: "", clientId: "" });
    },
    onError: (error) => {
      console.error("Error creating Project:", error);
    },
  });
  const params = useParams<{ slug: string }>();

  const [updateProjects] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: params.slug,
      name: project.name,
      description: project.description,
      status: project.status,
      clientId: project.clientId,
    },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: params.slug } }], // Refetch the project by ID
    onCompleted: (data) => {
      console.log("Project created successfully:", data);
      // Optionally reset the form or provide user feedback
      // setProject({ name: "", description: "", status: "", clientId: "" });
    },
    onError: (error) => {
      console.error("Error creating Project:", error);
    },
  });

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setProject((proProject) => ({
      ...proProject,
      [name]: value,
    }));
  }

  const handleSelectChange = (selectedValue: string) => {
    // Allow changing status only if it's not 'Done' or it's an update
    if (project.status === "Done" && !updateProject) return;

    // Log to check if the function is being triggered and what value is selected
    console.log("Selected value:", selectedValue);

    setProject((prevProject) => ({
      ...prevProject,
      status: selectedValue, // Update status
    }));
  };

  const handleClientChange = (selectedValue: string) => {
    setProject((prevProject) => ({
      ...prevProject,
      clientId: selectedValue, // Update clientId in the project state
    }));
  };

  const onSubmit = () => {
    // e: React.FormEvent<HTMLInputElement>
    // e.preventDefault();
    params.slug ? updateProjects() : createProject();
  };

  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error loading data...</p>;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {!params.slug ? (
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center py-2 px-4 rounded-md"
          >
            <FaTasks className="mr-2" /> Add Project
          </Button>
        ) : (
          <Button className="border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center py-2 px-4 rounded-md">
            <FaEdit className="mr-2" /> Edit
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-500">
            New Project
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
          <InputWithLabel
            handleChange={handleChange}
            type="name"
            label="Name"
            value={updateProject && updateProject.name}
          />
          <TextareaDemo
            className="max-w-sm"
            handleChange={handleChange}
            type="description"
            label="Description"
            value={updateProject && updateProject.description}
          />
          <p>Status</p>
          <SelectDemo
            handleChange={handleSelectChange}
            // value={updateProject && updateProject.status}
            value={project.status} // Ensure the correct value is passed
          />

          {!updateProject && (
            <>
              <p>Client</p>
              <SelectDemo
                handleChange={handleClientChange}
                clients={data.getAllClient}
              />
            </>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center py-2 px-4 rounded-md">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="hover:border-blue-500  text-white bg-blue-500 flex items-center justify-center py-2 px-4 rounded-md"
            onClick={onSubmit}
            disabled={
              project.name !== "" &&
              project.description !== "" &&
              project.status !== "" &&
              project.clientId !== ""
                ? false
                : true
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
