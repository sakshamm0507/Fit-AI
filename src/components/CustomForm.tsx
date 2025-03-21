
import React, { ReactNode } from "react";
import { Form, FormElement, Field } from "@progress/kendo-react-form";

export interface CustomFormProps {
  onSubmit: (data: any) => void;
  children: ReactNode;
  initialValues?: any;
  validator?: (data: any) => Record<string, string>;
  className?: string;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  component: any;
  validator?: (value: any) => string | undefined;
  [key: string]: any;
}

const CustomForm = ({
  onSubmit,
  children,
  initialValues = {},
  validator,
  className,
}: CustomFormProps) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validator={validator}
      render={(formRenderProps) => (
        <FormElement className={className}>
          {children}
        </FormElement>
      )}
    />
  );
};

export const FormField = ({
  name,
  label,
  component,
  validator,
  ...props
}: FormFieldProps) => {
  return (
    <Field
      name={name}
      label={label}
      component={component}
      validator={validator}
      {...props}
    />
  );
};

export default CustomForm;
