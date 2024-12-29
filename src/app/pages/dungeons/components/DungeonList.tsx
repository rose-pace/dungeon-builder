import React from 'react';
import Link from 'next/link';
import { Dungeon } from '@/types';

/**
 * DungeonList component.
 * @returns The rendered component.
 */
const DungeonList = ({ dungeons }: { dungeons: Dungeon[] }) => {
  return (
    <>
      <ul className="list-none ps-0 prose-li:ps-0">
        {dungeons.map(dungeon => (
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
