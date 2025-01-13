'use client';

import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { DungeonAsset, DispatchAction, Dispatcher } from '@/types';
import { createDispatcher, createStateSelectors, queryBuilder } from '@/utils';
import { refreshDungeonAssets } from './DungeonAssetServer';

interface DungeonAssetsContextValue {
  dungeonAssetSelectors: ReturnType<typeof createStateSelectors<DungeonAsset>>;
  dungeonAssetDispatcher: Dispatcher<DungeonAsset>;
}
const DungeonAssetsContext = createContext({} as DungeonAssetsContextValue);

interface DungeonAssetsProviderProps {
  children: React.ReactNode;
  dungeonAssets: DungeonAsset[];
}

/**
 * DungeonAssets provider component.
 *
 * @param props - Component properties.
 * @param props.children - The child components to render.
 * @param props.dungeonAssets - The dungeon assets to provide.
 * @returns The component.
 */
const DungeonAssetsProvider = ({ children, dungeonAssets }: DungeonAssetsProviderProps) => {
  // Initialize the dungeon assets state
  const initialState = dungeonAssets.reduce((acc, asset) => {
    acc[asset.slug] = asset;
    return acc;
  }, {} as Record<string, DungeonAsset>);

  // Create the dungeon assets dispatcher
  const [state, dispatch] = useImmerReducer(dungeonAssetReducer, initialState);
  const dungeonAssetSelectors = createStateSelectors(state);

  // Create the dungeon asset action handler
  const dungeonAssetActionSync = buildDungeonAssetActionSync(dispatch);
  const dungeonAssetDispatcher = createDispatcher(dungeonAssetActionSync);

  return (
    <DungeonAssetsContext.Provider value={{ dungeonAssetSelectors, dungeonAssetDispatcher }}>
      {children}
    </DungeonAssetsContext.Provider>
  );
};

// Default Export
export default DungeonAssetsProvider;

/**
 * Hook to use the dungeon assets context.
 *
 * @returns The dungeon assets context value.
 */
export const useDungeonAssetsContext = () => useContext(DungeonAssetsContext);

/**
 * Create a function that syncs server changes to the reducer.
 * @param dispatch dispatch function to update the dungeon assets in the reducer
 * @returns Promise object that resolves to a function that updates the dungeon assets in the reducer
 */
const buildDungeonAssetActionSync = (dispatch: React.Dispatch<DispatchAction<DungeonAsset>>) => {
  return async (action: DispatchAction<DungeonAsset>): Promise<void> => {
    // if delete then dispatch the original action, else refresh data from the server
    if (action.type === 'remove') {
      dispatch(action);
      return;
    }

    // refresh the dungeon assets
    const savedAsset = action.payload as DungeonAsset;
    const assets = await refreshDungeonAssets(queryBuilder<DungeonAsset>().any([{ id: savedAsset.id }]).query);

    if (assets.length > 0) {
      dispatch({ type: 'change', payload: assets });
      return;
    }

    throw new Error('Dungeon asset not found');
  };
};

/**
 * Reducer for the dungeon assets context.
 *
 * @param draft - The current state.
 * @param action - The action to apply.
 * @returns Only returns state to entirely replace state, else it is void.
 */
function dungeonAssetReducer(draft: Record<string, DungeonAsset>, action: DispatchAction<DungeonAsset>): void | Record<string, DungeonAsset> {
  const payload = Array.isArray(action.payload) ? action.payload : [action.payload];

  // handle possible changes to the initial slug
  const initialSlug = action.context?.initialSlug;
  if (initialSlug && Object.keys(draft).includes(initialSlug as string)) {
    delete draft[initialSlug as string];
  }

  // update state based on the action type
  switch (action.type) {
    // add or change the dungeon assets in the state
    case 'add':
    case 'change': {
      payload.forEach(asset => draft[asset.slug] = asset);
      return;
    }
    case 'set': {
      // replace the entire state with the new payload
      return payload.reduce((acc, asset) => {
        acc[asset.slug] = asset;
        return acc;
      }, {} as Record<string, DungeonAsset>);
    }
    case 'remove': {
      // remove the dungeon assets from the state
      payload.forEach(asset => delete draft[asset.slug]);
      return;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
