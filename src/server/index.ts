import { dataContextFactory, repositoryFactory } from './dataAccess';
import { Dungeon, DungeonFeature } from '@/types';

const currentDataContext = dataContextFactory();
// Create repositories
const dungeonRepository = repositoryFactory<Dungeon>(currentDataContext.dungeons);
const dungeonFeaturesRepository = repositoryFactory<DungeonFeature>(currentDataContext.dungeonFeatures);

export {
  dungeonRepository,
  dungeonFeaturesRepository,
};
