import { IEntity } from './common';
import { RollTable } from './mechanics';

export interface Connection {
  id: string;
  type: string;
  isHidden: boolean;
  targetAssetId: string;
}

export interface Dungeon extends IEntity {
  slug: string;
  name: string;
  description: string;
  images: string;
  audio: string;
  campaignNotes: string;
  dmSecrets: string;
  zones: Zone[];
}

export interface DungeonAsset extends IEntity {
  slug: string;
  type: 'ENCOUNTER' | 'HAZZARD' | 'TREASURE';
  name: string;
  description: string;
  images: string;
  rollTable?: RollTable;
}

export interface Zone extends IEntity {
  name: string;
  description: string;
  dungeonAssets: DungeonAsset[];
}
