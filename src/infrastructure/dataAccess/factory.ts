import { Dungeon } from '@/types';
import { IDataContext, IDataSet, IRepository } from './interfaces';
import MockDataSet from './MockDataSet';
import { create, filter, find, update, deleteEntity } from './queryCommands';

/**
 * Factory function to create a data context.
 * @returns The data context.
 */
const dataContextFactory = () => {
  const dataSource = process.env.DATA_SOURCE ?? 'mock';

  switch (dataSource) {
    case 'mock':
      return {
        dungeons: new MockDataSet<Dungeon>('dungeons'),
      } as IDataContext;
      // Add more cases here for other data sources
    default:
      throw new Error(`Unknown data source: ${dataSource}`);
  }
};

/**
 * Factory function to create a repository.
 * @param dataSet - The data set to create the repository from.
 * @returns The repository.
 */
const repositoryFactory = <T>(dataSet: IDataSet<T>) => {
  return {
    create: (entity: T) => create(dataSet, entity),
    filter: (criteria: Partial<T>[], skip?: number, take?: number) => filter(dataSet, criteria, skip, take),
    find: (criteria: Partial<T>[]) => find(dataSet, criteria),
    update: (entity: T, criteria: Partial<T>[]) => update(dataSet, entity, criteria),
    delete: (criteria: Partial<T>[]) => deleteEntity(dataSet, criteria),
  } as IRepository<T>;
};

export {
  dataContextFactory,
  repositoryFactory,
};
