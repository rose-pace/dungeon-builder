'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import SearchBar from '@components/common/SearchBar';
import DungeonList from './components/DungeonList';
import { useDungeonsContext } from '@providers';
import { Dungeon } from '@/types';

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
    <>
      <h1 className="mb-2">Dungeons</h1>
      <div className="border-y border-color py-4 text-sm">
        <SearchBar
          placeholder="Search Dungeons..."
          searchTerm={searchTerm}
          filterOptions={[{ key: 'name', value: 'Name' }, { key: 'desc:name', value: 'Name Desc' }]}
          onSearch={handleSearch}
          onSort={handleSort}
          className="mb-4"
        />
        <Link href="/dungeons/create" className="btn btn-primary no-underline">
          <FontAwesomeIcon icon={faSquarePlus} />
          &nbsp;
          Create Dungeon
        </Link>
      </div>
      <DungeonList dungeons={sortedDungeons} />
    </>
  );
};

export default DungeonDashboardPage;
