'use client';

import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { produce } from 'immer';
import { Dungeon, DispatchAction } from '@/types';
import { sendCreateDungeon, sendDeleteDungeon, sendUpdateDungeon } from '../components/DungeonServer';

interface DungeonsContextValue {
  dungeons: Dungeon[];
  dungeonActionHandler: (action: DispatchAction<Dungeon>) => Promise<void>;
}
const DungeonsContext = createContext({} as DungeonsContextValue);
interface DungeonProviderProps {
  children: React.ReactNode;
  dungeons: Dungeon[];
}

/**
 * Dungeons provider component.
 *
 * @param props - Component properties.
 * @param props.children - The child components to render.
 * @param props.dungeons - The dungeons to provide.
 * @returns The component.
 */
const DungeonsProvider = ({ children, dungeons }: DungeonProviderProps) => {
  // Initialize the dungeons state
  const initalState = dungeons.reduce((acc, dungeon) => {
    acc[dungeon.slug] = dungeon;
    return acc;
  }, {} as Record<string, Dungeon>);

  // Create the dungeons dispatcher
  const [, dispatch] = useImmerReducer(dungeonReducer, initalState);

  // Create the dungeon action handler
  const dungeonActionHandler = (action: DispatchAction<Dungeon>) => storeDungeonChanges(action).then(a => dispatch(a));

  return (
    <DungeonsContext.Provider value={{ dungeons, dungeonActionHandler }}>
      {children}
    </DungeonsContext.Provider>
  );
};

// Default Export
export default DungeonsProvider;

// Exports

/**
 * Hook to use the dungeons context.
 *
 * @returns The dungeons context value.
 */
export const useDungeonsContext = () => useContext(DungeonsContext);

/**
 * Reducer for the dungeons context.
 *
 * @param draft - The current state.
 * @param action - The action to apply.
 * @returns The new state.
 */
function dungeonReducer(draft: Record<string, Dungeon>, action: DispatchAction<Dungeon>): void | Record<string, Dungeon> {
  const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
  switch (action.type) {
    case 'add':
    case 'change': {
      payload.forEach(dungeon => draft[dungeon.slug] = dungeon);
      return;
    }
    case 'set': {
      return payload.reduce((acc, dungeon) => {
        acc[dungeon.slug] = dungeon;
        return acc;
      }, {} as Record<string, Dungeon>);
    }
    case 'remove': {
      return Object.keys(draft).reduce((acc, key) => {
        if (payload.findIndex(dungeon => dungeon.slug === key) === -1) {
          acc[key] = draft[key];
        }
        return acc;
      }, {} as Record<string, Dungeon>);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

/**
 * Send dungeon state changes to server.
 *
 * @param action - The action to store.
 * @returns The action with updated payload.
 */
async function storeDungeonChanges(action: DispatchAction<Dungeon>): Promise<DispatchAction<Dungeon>> {
  const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
  const promises = [] as Promise<Dungeon | void>[];
  switch (action.type) {
    case 'add': {
      payload.forEach(dungeon => promises.push(sendCreateDungeon(dungeon)));
      break;
    }
    case 'change': {
      payload.forEach(dungeon => promises.push(sendUpdateDungeon(dungeon)));
      break;
    }
    case 'remove': {
      payload.forEach(dungeon => promises.push(sendDeleteDungeon(dungeon)));
      break;
    }
    default: {
      break;
    }
  }
  const results = await Promise.all(promises);
  if (action.type === 'add') {
    // update the action before returning it
    return produce(action, (draft) => {
      draft.payload = results.filter((result): result is Dungeon => !!result);
    });
  }
  // return the action for the next step
  return action;
}
