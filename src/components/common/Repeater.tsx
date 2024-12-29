'use client';

import React, { useId, useOptimistic, startTransition } from 'react';
import { mergeClassNameProps } from '@/utils/ui/componentUtils';

interface RepeaterProps<T> {
  className?: string;
  records: T[];
  template: (record: T, index: number) => React.JSX.Element;
  reorderable?: boolean;
  reorderAction?: (reOrderedState: T[]) => void;
}

const useCreateUniqueId = (prefix: string): string => {
  return `${prefix}-${useId()}`;
};

const Repeater = <T,>({ records, template, className, reorderAction, reorderable = false }: RepeaterProps<T>) => {
  const [reorderedRecords, setReorderedRecords] = useOptimistic<T[], T[]>(
    records,
    (_, optimisticState) => optimisticState,
  );

  const handleReorder = (oldIndex: number, newIndex: number): void => {
    const reordered = [...reorderedRecords];
    reordered.splice(newIndex, 0, reordered.splice(oldIndex, 1)[0]);
    // callback to parent component
    reorderAction?.(reordered);
    // optimistic update
    startTransition(() => setReorderedRecords(reordered));
  };

  return (
    <div id={useCreateUniqueId('repeater-container')} className={mergeClassNameProps(className, 'flex flex-col flex-nowrap')}>
      {reorderedRecords.map((record, index) => (
        <RepeaterItem
          key={index}
          record={record}
          index={index}
          template={template}
          reorderable={reorderable}
          reorderAction={handleReorder}
        />
      ))}
    </div>
  );
};

interface RepeaterItemProps<T> {
  index: number;
  record: T;
  template: (record: T, index: number) => React.JSX.Element;
  reorderable: boolean;
  reorderAction: (oldIndex: number, newIndex: number) => void;
};

const RepeaterItem = <T,>({ record, index, template, reorderable, reorderAction }: RepeaterItemProps<T>) => {
  const isValidDropTarget = (e: React.DragEvent<HTMLDivElement>): boolean => {
    const dragFromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    return dragFromIndex !== index;
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isValidDropTarget(e)) {
      return;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isValidDropTarget(e)) {
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (e.currentTarget.classList.contains('border-emerald-400')) {
      return;
    }
    e.currentTarget.classList.add('border', 'border-4', 'border-emerald-400'); // add class to show where the item will be dropped
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('border', 'border-4', 'border-emerald-400'); // remove class to show where the item will be dropped
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isValidDropTarget(e)) {
      return;
    }
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData('text/plain'));
    reorderAction(oldIndex, index);
  };

  const uniqueId = useCreateUniqueId('repeater-item');

  if (reorderable) {
    return (
      <div
        id={uniqueId}
        key={index}
        draggable
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {template(record, index)}
      </div>
    );
  }

  return (
    <div id={uniqueId} key={index}>
      {template(record, index)}
    </div>
  );
};

export default Repeater;
