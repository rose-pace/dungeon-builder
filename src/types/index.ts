export interface Dungeon {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  audio: string;
  campaignNotes: string;
  dmSecrets: string;
  zones: Zone[];
}

export interface Zone {
  id: string;
  name: string;
  primaryRoom: DungeonElement;
  features: DungeonElement[];
}

export interface DungeonElement {
  id: string;
  type: string;
  name: string;
  children?: DungeonElement[];
  connections?: Connection[];
}

export interface Connection {
  id: string;
  type: string;
  targetElementId: string;
}

export interface ValidationDisplay {
  lead: string | null;
  show: boolean;
  errors: string[];
  warnings: string[];
}

export interface DispatchAction<T> {
  type: Extract<'add' | 'set' | 'remove' | 'change', string>;
  payload: T | T[];
}
