import { useQuery } from "@apollo/client";
import React from "react";
import { ClientRow, IClient } from "./clientRow";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { Loading } from "./loading";

export const Client = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error loading data...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {!error && !loading && (
        <div className="overflow-x-auto">
          <table className="max-w-[1024px] table-auto shadow-md">
            <thead>
              <tr className="border-green-500 border-2 ">
                <th className="p-4 text-left text-green-500 font-semibold">
                  Name
                </th>
                <th className="p-4 text-left text-green-500 font-semibold">
                  Email
                </th>
                <th className="p-4 text-left text-green-500 font-semibold">
                  Phone
                </th>
                <th className="p-4 text-center text-green-500 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.getAllClient.map((client: IClient) => (
                <ClientRow
                  key={client.id}
                  email={client.email}
                  name={client.name}
                  phone={client.phone}
                  id={client.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
