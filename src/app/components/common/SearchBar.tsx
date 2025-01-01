'use client';

// components/SearchBar.tsx
import React, { useState } from 'react';
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

  return (
    <div
      {...otherProps}
      className={mergeClassNameProps(className, 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4')}
    >
      <input
        title="Search Dungeons"
        aria-label="Search Dungeons"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="text-sm py-1"
      />
      <select
        title="Sort Dungeons"
        aria-label="Sort Dungeons"
        value={sortKey}
        onChange={e => handleSort(e.target.value)}
        className="text-sm py-1"
      >
        <option value="" className="text-gray-500">
          Sort by...
        </option>
        {filterOptions.map(({ key, value }) => (
          <option key={key} value={key}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
