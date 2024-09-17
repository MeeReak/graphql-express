import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithLabel({
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={`grid w-full max-w-sm items-center gap-1.5 ${className}`}>
      <Label className="text-base text-white" htmlFor={type}>
        {label}
      </Label>
      <Input
        className=""
        name={type}
        onChange={handleChange}
        type={type}
        id={type}
        placeholder={label}
        defaultValue={value}
      />
    </div>
  );
}
