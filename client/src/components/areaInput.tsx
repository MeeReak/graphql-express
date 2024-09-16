import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";

export function TextareaDemo({
  type,
  label,
  handleChange,
  className,
  value,
}: {
  type: string;
  label: string;
  className?: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <>
      <Label htmlFor={type}>{label}</Label>{" "}
      <Textarea
        className={`${className}`}
        name={type}
        onChange={handleChange}
        id={type}
        defaultValue={value}
        placeholder="Type your Description"
      />
    </>
  );
}
