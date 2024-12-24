import React from 'react';
import { mergeClassNameProps } from '@/utils';

interface Command {
  id: string;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | undefined) => void;
}

interface FormCommandsProps {
  className?: string;
  commands: Command[];
}

const FormCommands: React.FC<FormCommandsProps> = ({ className, commands }) => {
  return (
    <div className={mergeClassNameProps(className, 'flex gap-4')}>
      {commands.map(command => (
        <button key={command.id} type={command.type} className={generateButtonClasses(command)} onClick={getClickHandler(command)}>
          {command.label}
        </button>
      ))}
    </div>
  );
};

export default FormCommands;

function resetCommand(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.form?.reset();
};

function getClickHandler(command: Command) {
  return command.onClick || (command.type === 'reset' ? resetCommand : undefined);
}

function generateButtonClasses(command: Command): string | undefined {
  const defaultClassNames = 'text-white font-bold py-2 px-4 rounded';
  if (command.type === 'submit') {
    return mergeClassNameProps(defaultClassNames, 'bg-sky-500 hover:bg-sky-700', command.className);
  }
  else if (command.type === 'reset') {
    return mergeClassNameProps(defaultClassNames, 'bg-slate-500', 'hover:bg-slate-700', command.className);
  }
  // type is ('button' | undefined)
  return mergeClassNameProps(defaultClassNames, 'bg-gray-500', 'hover:bg-gray-700', command.className);
}
