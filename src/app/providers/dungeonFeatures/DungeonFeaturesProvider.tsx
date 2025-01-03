'use client';

import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { DungeonFeature, DispatchAction, Dispatcher } from '@/types';
import { createDispatcher, createStateSelectors, queryBuilder } from '@/utils';
import { refreshDungeonFeatures } from './DungeonFeatureServer';

interface DungeonFeaturesContextValue {
  dungeonFeatureSelectors: ReturnType<typeof createStateSelectors<DungeonFeature>>;
  dungeonFeatureDispatcher: Dispatcher<DungeonFeature>;
}
const DungeonFeaturesContext = createContext({} as DungeonFeaturesContextValue);

interface DungeonFeaturesProviderProps {
  children: React.ReactNode;
  dungeonFeatures: DungeonFeature[];
}

/**
 * DungeonFeatures provider component.
 *
 * @param props - Component properties.
 * @param props.children - The child components to render.
 * @param props.dungeonFeatures - The dungeon features to provide.
 * @returns The component.
 */
const DungeonFeaturesProvider = ({ children, dungeonFeatures }: DungeonFeaturesProviderProps) => {
  // Initialize the dungeon features state
  const initialState = dungeonFeatures.reduce((acc, feature) => {
    acc[feature.id] = feature;
    return acc;
  }, {} as Record<string, DungeonFeature>);

  // Create the dungeon features dispatcher
  const [state, dispatch] = useImmerReducer(dungeonFeatureReducer, initialState);
  const dungeonFeatureSelectors = createStateSelectors(state);

  // Create the dungeon feature action handler
  const dungeonFeatureActionSync = buildDungeonFeatureActionSync(dispatch);
  const dungeonFeatureDispatcher = createDispatcher(dungeonFeatureActionSync);

  return (
    <DungeonFeaturesContext.Provider value={{ dungeonFeatureSelectors, dungeonFeatureDispatcher }}>
      {children}
    </DungeonFeaturesContext.Provider>
  );
};

// Default Export
export default DungeonFeaturesProvider;

/**
 * Hook to use the dungeon features context.
 *
 * @returns The dungeon features context value.
 */
export const useDungeonFeaturesContext = () => useContext(DungeonFeaturesContext);

/**
 * Create a function that syncs server changes to the reducer.
 * @param dispatch dispatch function to update the dungeon features in the reducer
 * @returns Promise object that resolves to a function that updates the dungeon features in the reducer
 */
const buildDungeonFeatureActionSync = (dispatch: React.Dispatch<DispatchAction<DungeonFeature>>) => {
  return async (action: DispatchAction<DungeonFeature>): Promise<void> => {
    // if delete then dispatch the original action, else refresh data from the server
    if (action.type === 'remove') {
      dispatch(action);
      return;
    }

    // refresh the dungeon features
    const savedFeature = action.payload as DungeonFeature;
    const features = await refreshDungeonFeatures(queryBuilder<DungeonFeature>().any([{ id: savedFeature.id }]).query);

    if (features.length > 0) {
      dispatch({ type: 'change', payload: features });
      return;
    }

    throw new Error('Dungeon feature not found');
  };
};

/**
 * Reducer for the dungeon features context.
 *
 * @param draft - The current state.
 * @param action - The action to apply.
 * @returns Only returns state to entirely replace state, else it is void.
 */
function dungeonFeatureReducer(draft: Record<string, DungeonFeature>, action: DispatchAction<DungeonFeature>): void | Record<string, DungeonFeature> {
  const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
  switch (action.type) {
    // add or change the dungeon features in the state
    case 'add':
    case 'change': {
      payload.forEach(feature => draft[feature.id] = feature);
      return;
    }
    case 'set': {
      // replace the entire state with the new payload
      return payload.reduce((acc, feature) => {
        acc[feature.id] = feature;
        return acc;
      }, {} as Record<string, DungeonFeature>);
    }
    case 'remove': {
      // remove the dungeon features from the state
      payload.forEach(feature => delete draft[feature.id]);
      return;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
