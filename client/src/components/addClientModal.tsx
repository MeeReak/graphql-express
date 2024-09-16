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
import { FaUser } from "react-icons/fa";
import { InputWithLabel } from "./inputWithLabel";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT } from "@/mutation/clientMutation";
import { GET_CLIENTS } from "@/queries/clientQueries";

export function AlertDialogDemo() {
  const [client, setClient] = useState({ name: "", email: "", phone: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient, // Spread the previous client state
      [name]: value, // Update the specific field (name, email, or phone)
    }));
  }

  const [createClient] = useMutation(CREATE_CLIENT, {
    variables: {
      name: client.name,
      email: client.email,
      phone: client.phone,
    },
    refetchQueries: [{ query: GET_CLIENTS }],
    onCompleted: (data) => {
      console.log("Client created successfully:", data);
      // Optionally reset the form or provide user feedback
      setClient({ name: "", email: "", phone: "" });
    },
    onError: (error) => {
      console.error("Error creating client:", error);
    },
  });

  const onSubmit = () => {
    createClient();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <FaUser className="mr-2" /> Add Client
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>New Client</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <AlertDialogHeader>
          <InputWithLabel
            handleChange={handleChange}
            type="name"
            label="Name"
          />
          <InputWithLabel
            handleChange={handleChange}
            type="email"
            label="Email"
          />
          <InputWithLabel
            handleChange={handleChange}
            type="phone"
            label="Phone"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onSubmit}
            disabled={
              client.email !== "" && client.name !== "" && client.phone !== ""
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
