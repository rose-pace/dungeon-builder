import React, { useState } from 'react';

/**
 * DropDown component props interface.
 */
interface DropDownProps {
  /** The options to display in the dropdown */
  options: Record<string, React.ReactElement>;
  /** The placeholder text to display when no option is selected */
  placeholder: string;
  /** The key of the currently selected option */
  selectedKey: string;
}

/**
 * DropDown component.
 * @important
 * This component does not contain functionality to handle selecting an option.
 * You will need to implement this functionality in the parent component.
 *
 * @param props - The props for the DropDown component.
 * @returns The rendered DropDown component.
 *
 * @example
 * <DropDown
 *   options={{ key1: 'Option 1', key2: 'Option 2' }}
 *   placeholder="Select an option"
 *   selectedKey="key1"
 * />
 */
const DropDown: React.FC<DropDownProps> = ({ options, placeholder, selectedKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getSelectedText = () => {
    if (selectedKey && options[selectedKey]) {
      return options[selectedKey];
    }
    return placeholder ?? 'Select an option';
  };

  return (
    <div role="menu" className="inline-block">
      <div
        className="px-3 py-2 w-full bg-white dark:bg-zinc-600 border border-zinc-900 dark:border-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getSelectedText()}
      </div>
      <div hidden={!isOpen} className="absolute z-10 w-full mt-1 bg-white border border-zinc-900 dark:bg-zinc-600 dark:border-gray-500">
        {Object.keys(options).map(key => (
          <div
            key={key}
            role="menuitem"
            className="px-3 py-2"
            onClick={() => {
              setIsOpen(false);
              // Implement your own logic to handle selecting an option
            }}
          >
            {options[key]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
