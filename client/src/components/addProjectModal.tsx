import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaTasks } from "react-icons/fa";
import { InputWithLabel } from "./inputWithLabel";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { SelectDemo } from "./selectDemo";
import { Loading } from "./loading";
import { CREATE_PROJECT } from "@/mutation/projectMutation";
import { GET_PROJECTS } from "@/queries/projectQueries";

export function AlertDialogProject() {
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "",
    clientId: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setProject((proProject) => ({
      ...proProject,
      [name]: value,
    }));
  }

  const handleSelectChange = (selectedValue: string) => {
    setProject((prevProject) => ({
      ...prevProject,
      status: selectedValue, // Update status in the project state
    }));
  };

  const handleClientChange = (selectedValue: string) => {
    setProject((prevProject) => ({
      ...prevProject,
      clientId: selectedValue, // Update clientId in the project state
    }));
  };

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

  const onSubmit = () => {
    createProject();
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
        <Button variant="outline">
          <FaTasks className="mr-2" /> Add Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <h1 className="mb-5 font-bold text-lg">New Project</h1>
          <InputWithLabel
            handleChange={handleChange}
            type="name"
            label="Name"
          />
          <InputWithLabel
            className=""
            handleChange={handleChange}
            type="description"
            label="Description"
          />
          <p>Status</p>
          <SelectDemo handleChange={handleSelectChange} />

          <p>Client</p>
          <SelectDemo
            handleChange={handleClientChange}
            clients={data.getAllClient}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
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
