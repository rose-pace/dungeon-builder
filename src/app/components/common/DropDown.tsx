import React, { useState } from 'react';

/**
 * DropDown component props interface.
 */
interface DropDownProps {
  /** The options to display in the dropdown */
  options: Record<string, string>;
  /** The default text to display */
  placeholder: string;
  /** Callback when the selected value changes */
  onChange: (key: string) => void;
  /** The selected option */
  selected?: { key: string; value: string };
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
const DropDown: React.FC<DropDownProps> = ({ options, placeholder, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getTextValue = () => {
    if (selected) {
      return selected.value;
    }

    return placeholder ?? 'Select an option';
  };
  const defaultItemClassName = 'w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700';
  const getItemClassName = (key: string) => {
    if (selected && selected.key === key) {
      return `${defaultItemClassName} bg-sky-300 dark:bg-sky-600`;
    }

    return defaultItemClassName;
  };
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const handleSelectBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!optionsRef?.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      role="menu"
      className="relative inline-block"
    >
      <div className="absolute top-0 left-0 right-0">
        <input
          type="button"
          className="form-select w-full text-left"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          onBlur={handleSelectBlur}
          value={getTextValue()}
        />
        <div
          ref={optionsRef}
          hidden={!isOpen}
          className="z-10 w-full max-h-60 mt-1 overflow-auto bg-white border border-zinc-900 dark:bg-zinc-600 dark:border-gray-500"
        >
          <button
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              onChange('');
            }}
            className={defaultItemClassName}
          >
            <span className="opacity-50">
              {placeholder ?? 'Select an option'}
            </span>
          </button>
          {Object.keys(options).map(key => (
            <button
              type="button"
              key={key}
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onChange(key);
              }}
              className={getItemClassName(key)}
            >
              {options[key]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
