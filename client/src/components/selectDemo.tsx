import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ClientOption = {
  id: string | number; // id can be a number (for status options) or a string (for clients)
  name: string; // name of the client or status
};

// Define the props type, where clients can be an array of ClientOption or null
interface SelectDemoProps {
  clients?: ClientOption[] | null;
  handleChange: (value: string) => void;
  value?: string; // The current value to show in the select box
}

export function SelectDemo({ clients, handleChange, value }: SelectDemoProps) {
  const defaultStatusOptions: ClientOption[] = [
    { id: "Pending", name: "Pending" },
    { id: "Process", name: "Process" },
    { id: "Done", name: "Done" },
  ];

  const options = clients || defaultStatusOptions;

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="max-w-sm">
        <SelectValue
          placeholder={clients ? "Select a Client" : "Select a Status"}
        >
          {value &&
            options.find((option) => option.id.toString() === value)?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id.toString()}
              disabled={value === "Done" && option.id !== "Done"} // Only disable if status is "Done"
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
