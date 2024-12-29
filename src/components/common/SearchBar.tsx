'use client';

// components/SearchBar.tsx
import React, { useState } from 'react';
import DropDown from './DropDown';

interface SearchBarProps {
  placeholder?: string;
  searchTerm: string;
  filterOptions: Record<string, string>;
  onSearch: (term: string) => void;
  onSort: (key: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, filterOptions, onSearch, onSort, placeholder = 'Search...' }) => {
  const [sortKey, setSortKey] = useState('');
  const options = Object.entries(filterOptions);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value);
    onSort(e.target.value);
  };

  const handleSort = (key: string) => {
    setSortKey(key);
    onSort(key);
  };

  const dropdownOptions: Record<string, React.ReactElement> = {
    name: (
      <a href="#" onClick={() => handleSort('name')}>
        Name
      </a>
    ),
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
      <select value={sortKey} onChange={handleSortChange}>
        <option value="">Sort by...</option>
        {options.map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <DropDown
        options={dropdownOptions}
        placeholder="Sort by..."
        selectedKey={sortKey}
      />
    </div>
  );
};

export default SearchBar;
