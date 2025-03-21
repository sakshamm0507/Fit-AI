
import React from "react";
import { AutoComplete, AutoCompleteProps } from "@progress/kendo-react-dropdowns";

export interface KendoAutoCompleteProps extends Omit<AutoCompleteProps, 'data'> {
  className?: string;
  label?: string;
  options: Array<any>;
  textField?: string;
}

const KendoAutoComplete = ({
  className,
  label,
  options,
  textField = "text",
  ...props
}: KendoAutoCompleteProps) => {
  return (
    <div className="kendo-autocomplete-wrapper">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <AutoComplete
        className={className}
        data={options}
        textField={textField}
        {...props}
      />
    </div>
  );
};

export default KendoAutoComplete;
