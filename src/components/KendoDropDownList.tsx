
import React from "react";
import { DropDownList, DropDownListProps } from "@progress/kendo-react-dropdowns";

export interface KendoDropDownListProps extends DropDownListProps {
  className?: string;
  label?: string;
  options: Array<any>;
  textField?: string;
  valueField?: string;
}

const KendoDropDownList = ({
  className,
  label,
  options,
  textField = "text",
  valueField = "value",
  ...props
}: KendoDropDownListProps) => {
  return (
    <div className="kendo-dropdown-wrapper">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <DropDownList
        className={className}
        data={options}
        textField={textField}
        dataItemKey={valueField}
        {...props}
      />
    </div>
  );
};

export default KendoDropDownList;
