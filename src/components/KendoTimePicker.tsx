
import React from "react";
import { TimePicker, TimePickerProps } from "@progress/kendo-react-dateinputs";

export interface KendoTimePickerProps extends TimePickerProps {
  className?: string;
  label?: string;
}

const KendoTimePicker = ({ className, label, ...props }: KendoTimePickerProps) => {
  return (
    <div className="kendo-timepicker-wrapper">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <TimePicker
        className={className}
        format="HH:mm"
        {...props}
      />
    </div>
  );
};

export default KendoTimePicker;
