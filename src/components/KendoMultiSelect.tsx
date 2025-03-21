
import React from "react";
import { MultiSelect, MultiSelectProps } from "@progress/kendo-react-dropdowns";

export interface KendoMultiSelectProps extends MultiSelectProps {
  className?: string;
  label?: string;
  options: Array<any>;
  textField?: string;
  valueField?: string;
}

const KendoMultiSelect = ({
  className,
  label,
  options,
  textField = "text",
  valueField = "value",
  ...props
}: KendoMultiSelectProps) => {
  return (
    <div className="kendo-multiselect-wrapper">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <MultiSelect
        className={className}
        data={options}
        textField={textField}
        dataItemKey={valueField}
        filterable={true}
        {...props}
      />
    </div>
  );
};

export default KendoMultiSelect;
