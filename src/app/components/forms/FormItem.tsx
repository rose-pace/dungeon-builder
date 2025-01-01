import React, { useId } from 'react';
import ValidationMessage from './ValidationMessage';
import { ValidationDisplay } from '@/types';

interface FormItemProps {
  label: string;
  renderFormElement: (id: string) => React.ReactNode;
  children?: React.ReactNode;
  isRequired?: boolean;
  validation?: ValidationDisplay;
  className?: string;
}

const FormItem: React.FC<FormItemProps> = ({ label, renderFormElement, children, isRequired, validation, className }) => {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 ${className}`} title={isRequired ? 'This field is required' : ''}>
      <label htmlFor={id}>{`${label}${isRequired ? '*' : ''}`}</label>
      {renderFormElement(id)}
      {children}
      <ValidationMessage validation={validation} />
    </div>
  );
};

export default FormItem;
