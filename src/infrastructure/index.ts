import { dataContextFactory, repositoryFactory } from './dataAccess';
import { Dungeon } from '@/types';

const currentDataContext = dataContextFactory();
// Create repositories
const dungeonRepository = repositoryFactory<Dungeon>(currentDataContext.dungeons);

export {
  dungeonRepository,
};
