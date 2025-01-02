import React, { ComponentPropsWithoutRef } from 'react';
import { mergeClassNameProps } from '@/utils';

type Command = { label?: string } & ComponentPropsWithoutRef<'button'>;

interface FormCommandsProps {
  className?: string;
  commands: Command[];
}

const FormCommands: React.FC<FormCommandsProps> = ({ className, commands }) => {
  return (
    <div className={mergeClassNameProps(className, 'flex gap-4')}>
      {commands.map(({ id: key, type, className, label, onClick, ...rest }) => {
        // generate the button classes
        const generatedClasses = generateButtonClasses(type as string, className ?? '');
        // get the click handler
        const clickHandler = getClickHandler(type as string, onClick);
        // return the button
        return (
          <button {...rest} key={key} type={type} className={generatedClasses} onClick={clickHandler}>
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FormCommands;

function resetCommand(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.form?.reset();
};

function getClickHandler(type: string, onClick?: React.MouseEventHandler<HTMLButtonElement>): React.MouseEventHandler<HTMLButtonElement> | undefined {
  return onClick || (type === 'reset' ? resetCommand : undefined);
}

function generateButtonClasses(type: string, className: string): string | undefined {
  const defaultClassNames = 'text-white font-bold py-2 px-4 disabled:opacity-50 disabled:pointer-events-none rounded';
  if (type === 'submit') {
    return mergeClassNameProps(defaultClassNames, 'bg-sky-500 hover:bg-sky-700', className);
  }
  else if (type === 'reset') {
    return mergeClassNameProps(defaultClassNames, 'bg-slate-500', 'hover:bg-slate-700', className);
  }
  // type is ('button' | undefined)
  return mergeClassNameProps(defaultClassNames, 'bg-gray-500', 'hover:bg-gray-700', className);
}
