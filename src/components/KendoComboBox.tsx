
import React from "react";
import { ComboBox, ComboBoxProps } from "@progress/kendo-react-dropdowns";

export interface KendoComboBoxProps extends Omit<ComboBoxProps, 'data'> {
  className?: string;
  label?: string;
  options: Array<any>;
  textField?: string;
  valueField?: string;
}

const KendoComboBox = ({
  className,
  label,
  options,
  textField = "text",
  valueField = "value",
  ...props
}: KendoComboBoxProps) => {
  return (
    <div className="kendo-combobox-wrapper">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <ComboBox
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

export default KendoComboBox;
