'use client';

import { Dungeon } from '@/types';
import { useState } from 'react';

interface DefaultState {
  dungeons: Dungeon[];
}
// Load default data for development
export const defaultState: DefaultState = {
  dungeons: [
    { slug: 'goblin-cave', name: 'Goblin Cave', description: 'A cave with a goblin ambush.', id: '1', images: [], audio: '', campaignNotes: '', dmSecrets: '', zones: [] },
    { slug: 'dragon-lair', name: 'Dragon Lair', description: 'A lair with a dragon.', id: '2', images: [], audio: '', campaignNotes: '', dmSecrets: '', zones: [] },
    { slug: 'undead-crypt', name: 'Undead Crypt', description: 'A crypt with undead creatures.', id: '3', images: [], audio: '', campaignNotes: '', dmSecrets: '', zones: [] },
  ],
};

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const mockLocalStorage = (state: Record<keyof DefaultState, string>) => {
    return {
      getItem: (key: keyof DefaultState) => {
        return state[key];
      },
      setItem: (key: keyof DefaultState, value: string) => {
        state[key] = value;
      },
    } as Storage;
  };

  // Use localStorage if available, otherwise use mockLocalStorage
  const appStorage = (typeof window !== 'undefined' ? window.localStorage : mockLocalStorage({} as Record<keyof DefaultState, string>));

  const initializeState = (state: Storage) => {
    // get keys from DefaultState interface
    const keys = Object.keys(defaultState) as Array<keyof DefaultState>;
    keys.forEach((key) => {
      if (state.getItem(key)) {
        return;
      }
      state.setItem(key, JSON.stringify(defaultState[key]));
    });
  };

  const [storedValue, setStoredValue] = useState<T>(() => {
    initializeState(appStorage);
    try {
      const item = appStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      }
      else {
        appStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    }
    catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      appStorage.setItem(key, JSON.stringify(valueToStore));
    }
    catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
