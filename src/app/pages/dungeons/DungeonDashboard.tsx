'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import DungeonList from './components/DungeonList';
import { useDungeonsContext } from '@providers';
import { Dungeon } from '@/types';
import Grid from '@/components/layout/Grid';

const DungeonDashboardPage = () => {
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
    <Grid>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} onSort={handleSort} />
      <DungeonList dungeons={sortedDungeons} />
    </Grid>
  );
};

export default DungeonDashboardPage;
