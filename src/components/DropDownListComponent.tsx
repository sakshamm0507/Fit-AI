
import React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export interface DropDownListComponentProps {
  data: any[];
  textField?: string;
  valueField?: string;
  label?: string;
  value?: any;
  onChange?: (event: any) => void;
  defaultItem?: any;
  disabled?: boolean;
  className?: string;
}

const DropDownListComponent = ({
  data,
  textField = "text",
  valueField = "value",
  label,
  value,
  onChange,
  defaultItem,
  disabled,
  className,
}: DropDownListComponentProps) => {
  return (
    <div className="dropdown-container">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <DropDownList
        data={data}
        textField={textField}
        dataItemKey={valueField}
        value={value}
        onChange={onChange}
        defaultItem={defaultItem}
        disabled={disabled}
        className={className}
      />
    </div>
  );
};

export default DropDownListComponent;
