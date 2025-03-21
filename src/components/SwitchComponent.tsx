
import React from "react";
import { Switch } from "@progress/kendo-react-inputs";

export interface SwitchComponentProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  onLabel?: string;
  offLabel?: string;
  className?: string;
}

const SwitchComponent = ({
  checked,
  onChange,
  label,
  disabled,
  onLabel,
  offLabel,
  className,
}: SwitchComponentProps) => {
  const handleChange = (event: any) => {
    onChange(event.value);
  };

  return (
    <div className="switch-container flex items-center">
      {label && <label className="text-sm font-medium mr-2">{label}</label>}
      <Switch
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        onLabel={onLabel}
        offLabel={offLabel}
        className={className}
      />
    </div>
  );
};

export default SwitchComponent;
