import { Dungeon } from '@/types';

export interface IQueryParts<T> {
  entity: T;
  filterCriteria?: Partial<T>[];
  skip?: number;
  take?: number;
}

export interface IDataSet<T> {
  runQuery(query: IQueryParts<T>): Promise<T[]>;
  save(entity: T, query?: IQueryParts<T>): Promise<void>;
  delete(query: IQueryParts<T>): Promise<void>;
}

export interface IDataContext {
  dungeons: IDataSet<Dungeon>;
}

export interface IRepository<T> {
  create(entity: T): Promise<T>;
  filter(criteria: Partial<T>[], skip?: number, take?: number): Promise<T[]>;
  find(criteria: Partial<T>[]): Promise<T | null>;
  update(entity: T, criteria: Partial<T>[]): Promise<void>;
  delete(criteria: Partial<T>[]): Promise<void>;
}
