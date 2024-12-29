import React, { ComponentPropsWithoutRef } from 'react';

type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  colorStyle?: 'primary' | 'secondary' | 'danger';
} & ComponentPropsWithoutRef<'button'>;

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  label = '',
  colorStyle = 'secondary',
  disabled = false,
  onClick = () => {},
  ...otherProps
}) => {
  let styleClasses = 'text-white font-bold py-2 px-4 rounded';
  switch (colorStyle) {
    case 'primary':
      styleClasses += ' bg-sky-500 hover:bg-sky-700';
      break;
    case 'danger':
      styleClasses += ' bg-red-500 hover:bg-red-700';
      break;
    case 'secondary':
    default:
      styleClasses += ' bg-gray-500 hover:bg-gray-700';
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styleClasses}
      title={label}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
