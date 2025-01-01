'use client';

import React, { useState } from 'react';
import SearchBar from '@components/common/SearchBar';
import DungeonList from './components/DungeonList';
import { useDungeonsContext } from '@providers';
import { Dungeon } from '@/types';
import Grid from '@/app/components/layout/Grid';

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
    let key = sortKey as keyof Dungeon;
    let desc = false;
    if (key.startsWith('desc:')) {
      key = key.replace('desc:', '') as keyof Dungeon;
      desc = true;
    }
    if (!(key in sortedDungeons?.[0])) {
      // reset sort
      setSortedDungeons(dungeonSelectors.getAll());
      return;
    }
    const sorted = [...sortedDungeons].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      return 0;
    });
    if (desc) {
      sorted.reverse();
    }
    setSortedDungeons(sorted);
  };

  return (
    <Grid columns={2}>
      <SearchBar
        className="col-span-2"
        placeholder="Search Dungeons..."
        searchTerm={searchTerm}
        filterOptions={[{ key: 'name', value: 'Name' }, { key: 'desc:name', value: 'Name Desc' }]}
        onSearch={handleSearch}
        onSort={handleSort}
      />
      <DungeonList dungeons={sortedDungeons} />
    </Grid>
  );
};

export default DungeonDashboardPage;
