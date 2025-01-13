import { dataContextFactory, repositoryFactory } from './dataAccess';
import { Dungeon, DungeonAsset } from '@/types';

const currentDataContext = dataContextFactory();
// Create repositories
const dungeonRepository = repositoryFactory<Dungeon>(currentDataContext.dungeons);
const dungeonAssetsRepository = repositoryFactory<DungeonAsset>(currentDataContext.dungeonAssets);

export {
  dungeonRepository,
  dungeonAssetsRepository,
};
