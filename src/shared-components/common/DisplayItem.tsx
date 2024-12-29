import React, { useId, ComponentPropsWithoutRef } from 'react';

type DisplayItemProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
} & ComponentPropsWithoutRef<'div'>;

const DisplayItem: React.FC<DisplayItemProps> = ({ children, className, label, ...otherProps }) => {
  const id = useId();
  return (
    <div {...otherProps} className={className}>
      {label && (
        <span id={`label_${id}`} className="text-sm block font-extralight">
          {label}
        </span>
      )}
      <span id={id} className="block font-semibold">
        {children}
      </span>
    </div>
  );
};

export default DisplayItem;
