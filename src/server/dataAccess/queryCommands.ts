import { IDataSet, IQueryParts } from './interfaces';

export async function create<T>(collection: IDataSet<T>, entity: T): Promise<void> {
  await collection.save(entity);
}

export async function filter<T>(collection: IDataSet<T>, criteria: Partial<T>[], skip?: number, take?: number): Promise<T[]> {
  const query = {
    filterCriteria: criteria,
    skip,
    take,
  } as IQueryParts<T>;
  return await collection.runQuery(query);
}

export async function find<T>(collection: IDataSet<T>, criteria: Partial<T>[]): Promise<T | null> {
  const results = await filter(collection, criteria, 0, 1);
  return results.length ? results[0] : null;
}

export async function deleteEntity<T>(collection: IDataSet<T>, criteria: Partial<T>[]): Promise<void> {
  const query = {
    filterCriteria: criteria,
  } as IQueryParts<T>;
  await collection.delete(query);
}

export async function update<T>(collection: IDataSet<T>, entity: T, criteria: Partial<T>[]): Promise<void> {
  const query = {
    entity,
    filterCriteria: criteria,
  } as IQueryParts<T>;
  await collection.save(entity, query);
}
