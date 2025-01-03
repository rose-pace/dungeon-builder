import { v4 as uuidv4 } from 'uuid';
import { IEntity } from '@/types';
import { IDataSet, IQueryParts } from './interfaces';

export async function create<T extends IEntity>(collection: IDataSet<T>, model: T): Promise<void> {
  // ensure that id, createdAt, and updatedAt are not set
  const entity = { ...model, id: uuidv4(), createdAt: Date.now(), updatedAt: undefined } as T;
  await collection.save(entity);
}

export async function filter<T extends IEntity>(collection: IDataSet<T>, criteria: Partial<T>[], skip?: number, take?: number): Promise<T[]> {
  const query = {
    filterCriteria: criteria,
    skip,
    take,
  } as IQueryParts<T>;
  return await collection.runQuery(query);
}

export async function find<T extends IEntity>(collection: IDataSet<T>, criteria: Partial<T>[]): Promise<T | null> {
  const results = await filter(collection, criteria, 0, 1);
  return results.length ? results[0] : null;
}

export async function deleteEntity<T extends IEntity>(collection: IDataSet<T>, criteria: Partial<T>[]): Promise<void> {
  const query = {
    filterCriteria: criteria,
  } as IQueryParts<T>;
  await collection.delete(query);
}

export async function update<T extends IEntity>(collection: IDataSet<T>, model: T, criteria: Partial<T>[]): Promise<void> {
  const entity = { ...model, updatedAt: Date.now() } as T;
  const query = {
    entity,
    filterCriteria: criteria,
  } as IQueryParts<T>;
  await collection.save(entity, query);
}
