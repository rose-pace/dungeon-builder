'use client';

// components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  onSort: (key: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch, onSort }) => {
  const [sortKey, setSortKey] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value);
    onSort(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search dungeons..."
      />
      <select value={sortKey} onChange={handleSortChange}>
        <option value="">Sort by...</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};

export default SearchBar;
