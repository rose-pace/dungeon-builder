'use client';

// components/SearchBar.tsx
import React, { useState } from 'react';
import DropDown from './DropDown';
import { mergeClassNameProps } from '@/utils';

type SearchBarProps = {
  placeholder?: string;
  searchTerm: string;
  filterOptions: { key: string; value: string }[];
  onSearch: (term: string) => void;
  onSort: (key: string) => void;
} & React.ComponentPropsWithoutRef<'div'>;

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, filterOptions, onSearch, onSort, placeholder = 'Search...', className, ...otherProps }) => {
  const [sortKey, setSortKey] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSort = (key: string) => {
    setSortKey(key);
    onSort(key);
  };

  const sortOptions = filterOptions.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const getSelected = () => {
    if (sortKey && filterOptions.some(option => option.key === sortKey)) {
      return filterOptions.find(option => option.key === sortKey);
    }

    return undefined;
  };

  return (
    <div {...otherProps} className={mergeClassNameProps(className, 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4')}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
      <DropDown
        options={sortOptions}
        placeholder="Sort by..."
        selected={getSelected()}
        onChange={handleSort}
      />
    </div>
  );
};

export default SearchBar;
