'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@components/common/SearchBar';
import { useDungeonsContext } from '../../_providers/DungeonsProvider';
import { Dungeon } from '@/types';

/**
 * DungeonList component.
 * @returns The rendered component.
 */
const DungeonList = () => {
  const { dungeonSelectors } = useDungeonsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedDungeons, setSortedDungeons] = useState(dungeonSelectors.getAll());

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredDungeons = dungeonSelectors.getAll().filter(dungeon =>
      dungeon.name.toLowerCase().includes(term.toLowerCase()),
    );
    setSortedDungeons(filteredDungeons);
  };

  const handleSort = (sortKey: string) => {
    const key = sortKey as keyof Dungeon;
    const sorted = [...sortedDungeons].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      return 0;
    });
    setSortedDungeons(sorted);
  };

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} onSort={handleSort} />
      <ul className="list-none ps-0 prose-li:ps-0">
        {sortedDungeons.map(dungeon => (
          <li key={dungeon.id}>
            <Link href={`/dungeons/${dungeon.slug}`}>
              {dungeon.name}
            </Link>
            <div>{dungeon.description}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DungeonList;
