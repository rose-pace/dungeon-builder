'use client';

import React, { useActionState, useState } from 'react';
import FormCommands from './FormCommands';
import ResettableForm from './ResettableForm';

interface FormProps<T> {
  /** The form data */
  data: Awaited<T>;
  /** Function to render form fields */
  renderFormFields: (formData: Awaited<T>, onChange: () => void) => React.ReactNode;
  /** Function to render additional form content */
  renderAdditionalFormContent?: (formData: Awaited<T>, onChange: () => void) => React.ReactNode;
  /** Function to handle form submission */
  submitAction: (initialState: T, updateState: FormData) => Promise<T>;
}

/**
 * Generic form component that accepts a grid column count, a render formFields function, and a renderAdditionalFormContent function
 * @param props - The props for the Form component
 * @returns JSX.Element
 */
const Form = <T,>({ data, renderFormFields, renderAdditionalFormContent, submitAction }: FormProps<T>) => {
  const [isDirty, setDirty] = useState(false);
  const [formData, formDispatch, isPending] = useActionState<T, FormData>(submitAction, data);

  const handleChange = () => {
    if (!isDirty) {
      setDirty(true);
    }
  };

  return (
    <ResettableForm render={({ key, resetAction }) => (
      <form
        key={key}
        action={formDispatch}
        className="py-8 px-4 rounded-xl bg-gradient-to-b from-slate-300 dark:from-zinc-800 from-10% via-zinc-200 dark:via-slate-700 via-50% to-gray-300 dark:to-gray-700 to-90%"
      >
        {renderFormFields(formData, handleChange)}
        {renderAdditionalFormContent && renderAdditionalFormContent(formData, handleChange)}
        <FormCommands
          className="mt-6 pt-6 border-t border-sky-700"
          commands={[
            { id: 'submit', label: 'Submit', type: 'submit', disabled: isPending || !isDirty },
            { id: 'reset', label: 'Reset', type: 'reset', onClick: resetAction, disabled: !isDirty },
          ]}
        />
      </form>
    )}
    />
  );
};

export default Form;
