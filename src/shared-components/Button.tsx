import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', label = '', disabled = false, onClick = () => {} }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      title={label}
    >
      {children}
    </button>
  );
};

export default Button;
