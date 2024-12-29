'use client';

import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { Dungeon, DispatchAction, Dispatcher } from '@/types';
import { createDispatcher, createStateSelectors, queryBuilder } from '@/utils';
import { refreshDungeons } from './DungeonServer';

interface DungeonsContextValue {
  dungeonSelectors: ReturnType<typeof createStateSelectors<Dungeon>>;
  dungeonDispatcher: Dispatcher<Dungeon>;
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
  const [state, dispatch] = useImmerReducer(dungeonReducer, initalState);
  const dungeonSelectors = createStateSelectors(state);

  // Create the dungeon action handler
  const dungeonActionSync = buildDungeonActionSync(dispatch);
  const dungeonDispatcher = createDispatcher(dungeonActionSync);

  return (
    <DungeonsContext.Provider value={{ dungeonSelectors, dungeonDispatcher }}>
      {children}
    </DungeonsContext.Provider>
  );
};

// Default Export
export default DungeonsProvider;

/**
 * Create a function that syncs server changes to the reducer.
 * @param dispatch dispatch function to update the dungeons in the reducer
 * @returns Promise object that resolves to a function that updates the dungeons in the reducer
 */
const buildDungeonActionSync = (dispatch: React.Dispatch<DispatchAction<Dungeon>>) => {
  return async (action: DispatchAction<Dungeon>): Promise<void> => {
    // if delete then dispatch the original action, else refresh data from the server
    if (action.type === 'remove') {
      dispatch(action);
      return;
    }

    // refresh the dungeons
    const savedDungeon = action.payload as Dungeon;
    const dungeons = await refreshDungeons(queryBuilder<Dungeon>().any([{ slug: savedDungeon.slug }]).query);

    if (dungeons.length > 0) {
      dispatch({ type: 'change', payload: dungeons });
      return;
    }

    throw new Error('Dungeon not found');
  };
};

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
 * @returns Only returns state to entirely replace state, else it is void.
 */
function dungeonReducer(draft: Record<string, Dungeon>, action: DispatchAction<Dungeon>): void | Record<string, Dungeon> {
  const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
  switch (action.type) {
    // add or change the dungeons in the state
    case 'add':
    case 'change': {
      payload.forEach(dungeon => draft[dungeon.slug] = dungeon);
      return;
    }
    case 'set': {
      // replace the entire state with the new payload
      return payload.reduce((acc, dungeon) => {
        acc[dungeon.slug] = dungeon;
        return acc;
      }, {} as Record<string, Dungeon>);
    }
    case 'remove': {
      // remove the dungeons from the state
      payload.forEach(dungeon => delete draft[dungeon.slug]);
      return;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
