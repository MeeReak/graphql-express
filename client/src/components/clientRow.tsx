import { DELETE_CLIENT } from "@/mutation/clientMutation";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { GET_PROJECTS } from "@/queries/projectQueries";
import { useMutation } from "@apollo/client";
import React from "react";
import { FaTrash } from "react-icons/fa";

export interface IClient {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export const ClientRow = (client: IClient) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (client.id) {
      try {
        await deleteClient({
          variables: { id: client.id },
          refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
        });
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  return (
    <tr className="border-b border-green-500 hover:bg-green-100 transition duration-150">
      <td className="p-4 text-green-500">{client.name}</td>
      <td className="p-4 text-green-500">{client.email}</td>
      <td className="p-4 text-green-500">{client.phone}</td>
      <td className="p-4 text-center">
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600 focus:outline-none"
        >
          <FaTrash className="inline-block" />
        </button>
      </td>
    </tr>
  );
};
