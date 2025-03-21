
import React from "react";
import { DatePicker, DatePickerProps } from "@progress/kendo-react-dateinputs";

export interface KendoDatePickerProps extends DatePickerProps {
  className?: string;
  label?: string;
}

const KendoDatePicker = ({ className, label, ...props }: KendoDatePickerProps) => {
  return (
    <div className="kendo-datepicker-wrapper">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <DatePicker
        className={className}
        format="yyyy-MM-dd"
        {...props}
      />
    </div>
  );
};

export default KendoDatePicker;
