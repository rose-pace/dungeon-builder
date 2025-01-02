import React from 'react';
import { ValidationDisplay } from '@/types';

interface ValidationMessageProps {
  validation?: ValidationDisplay;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({ validation }) => {
  if (!validation) {
    return null;
  }

  return (
    <div className={`text-red-900 ${validation?.show ? 'block' : 'hidden'}`}>
      {validation.lead && <span className="text-lg">{validation.lead}</span>}
      {validation.errors.length === 1 && <span>{validation.errors[0]}</span>}
      {validation.errors.length > 1 && (
        <ul>
          {validation.errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ValidationMessage;
