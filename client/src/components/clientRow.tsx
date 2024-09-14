import { DELETE_CLIENT } from "@/mutation/clientMutation";
import { GET_CLIENT } from "@/queries/clientQueries";
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
          refetchQueries: [{ query: GET_CLIENT }],
        });
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  return (
    <tr className="border-b border-green-200 hover:bg-green-50 transition duration-150">
      <td className="p-4 text-green-900">{client.name}</td>
      <td className="p-4 text-green-900">{client.email}</td>
      <td className="p-4 text-green-900">{client.phone}</td>
      <td className="p-4 text-center">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-900 focus:outline-none"
        >
          <FaTrash className="inline-block" />
        </button>
      </td>
    </tr>
  );
};
