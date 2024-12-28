import { DungeonFeatureType } from './constants';

export interface Connection {
  id: string;
  type: string;
  isHidden: boolean;
  targetElementId: string;
}

export interface Dungeon {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string;
  audio: string;
  campaignNotes: string;
  dmSecrets: string;
  zones: Zone[];
}

export interface DungeonFeature {
  id: string;
  type: DungeonFeatureType;
  name: string;
  description: string;
  images: string;
  noChildren: boolean;
  mustHaveParent: boolean;
  childWhitelist: DungeonFeature[];
  childFeatures: DungeonFeature[];
  connections: Connection[];
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  primaryRoom: DungeonFeature;
  features: DungeonFeature[];
}
