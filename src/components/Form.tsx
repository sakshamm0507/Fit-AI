
import React from "react";
import { Input } from "@progress/kendo-react-inputs";

export interface KendoInputProps {
  label?: string;
  error?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const Form = {
  Input: ({ label, error, className, ...props }: KendoInputProps) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <Input
          className={`w-full ${className || ''}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
};

export default Form;
