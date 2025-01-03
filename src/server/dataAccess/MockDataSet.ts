import { Dungeon, DungeonFeature, DUNGEON_FEATURE_TYPES } from '@/types';
import { IDataSet, IQueryParts } from './interfaces';
import { criteriaSymbol, operatorSymbol, Operator } from '@/utils/data/queryUtils';

/**
 * Builds a predicate function from a list of criteria.
 *
 * @param criteria - The list of criteria to build the predicate from.
 * @param predicate - The predicate function to use.
 * @returns The built predicate function.
 */
function buildPredicate<T>(criteria: Partial<T>[], predicate: (item: T) => boolean = () => true): (item: T) => boolean {
  // get operator from criteria
  const operator = Reflect.get(criteria, operatorSymbol) as Operator | undefined;
  // get next criteria
  const nextCriteria = Reflect.get(criteria, criteriaSymbol) as Partial<T>[] | undefined;

  let nextPredicate: ((item: T) => boolean) | undefined;
  if (operator === Operator.OR) {
    nextPredicate = item => criteria.some(c => Object.keys(c).every(key => item[key as keyof T] === c[key as keyof T]));
  }
  else if (operator === Operator.NOT) {
    nextPredicate = item => !criteria.every(c => Object.keys(c).every(key => item[key as keyof T] === c[key as keyof T]));
  }
  else {
    nextPredicate = item => criteria.every(c => Object.keys(c).every(key => item[key as keyof T] === c[key as keyof T]));
  }
  // recursively build the predicate
  if (nextCriteria) {
    nextPredicate = buildPredicate(nextCriteria, nextPredicate);
  }

  return item => predicate(item) && nextPredicate(item);
}

/**
 * MockDataSet class.
 */
export default class MockDataSet<T> implements IDataSet<T> {
  private data: T[] = [];

  constructor(type: keyof DefaultState) {
    this.data = defaultState[type] as T[];
  }

  async runQuery(query: IQueryParts<T>): Promise<T[]> {
    if (query.filterCriteria) {
      return this.data.filter(buildPredicate(query.filterCriteria));
    }
    return [...this.data];
  }

  async save(entity: T, query?: IQueryParts<T> | undefined): Promise<void> {
    if (query) {
      const queryResults = await this.runQuery(query);
      const existingEntity = queryResults.length ? queryResults[0] : null;
      if (!existingEntity) return;

      const updated = { ...existingEntity, ...entity };
      this.data = this.data.map(item => item === existingEntity ? updated : item);
      return;
    }
    this.data = [...this.data, { ...entity, id: (this.data.length + 1).toString() }];
    return;
  }

  async delete(query: IQueryParts<T>): Promise<void> {
    const results = await this.runQuery(query);
    const entity = results.length ? results[0] : null;
    this.data = this.data.filter(item => item !== entity);
  }
}

// Default State

interface DefaultState {
  dungeons: Dungeon[];
  dungeonFeatures: DungeonFeature[];
}
const defaultState: DefaultState = {
  dungeons: [
    { slug: 'goblin-cave', name: 'Goblin Cave', description: 'A cave with a goblin ambush.', id: '1', images: '', audio: '', campaignNotes: '', dmSecrets: '', zones: [], createdAt: new Date('2023-10-01T10:00:00Z').getTime() },
    { slug: 'dragon-lair', name: 'Dragon Lair', description: 'A lair with a dragon.', id: '2', images: '', audio: '', campaignNotes: '', dmSecrets: '', zones: [], createdAt: new Date('2024-04-02T10:00:00Z').getTime() },
    { slug: 'undead-crypt', name: 'Undead Crypt', description: 'A crypt with undead creatures.', id: '3', images: '', audio: '', campaignNotes: '', dmSecrets: '', zones: [], createdAt: new Date('2024-08-03T10:00:00Z').getTime() },
  ],
  dungeonFeatures: [
    { id: '1', slug: 'enchanted-sword', name: 'Enchanted Sword', description: 'A sword with magical properties.', type: DUNGEON_FEATURE_TYPES.TREASURE, images: '', noChildren: false, mustHaveParent: false, childWhitelist: [], childFeatures: [], connections: [], createdAt: new Date('2023-10-01T10:00:00Z').getTime() },
    { id: '2', slug: 'mystic-wand', name: 'Mystic Wand', description: 'A wand that can cast powerful spells.', type: DUNGEON_FEATURE_TYPES.TREASURE, images: '', noChildren: false, mustHaveParent: false, childWhitelist: [], childFeatures: [], connections: [], createdAt: new Date('2024-04-02T10:00:00Z').getTime() },
    { id: '3', slug: 'portion-of-healing', name: 'Potion of Healing', description: 'A potion that heals wounds.', type: DUNGEON_FEATURE_TYPES.TREASURE, images: '', noChildren: false, mustHaveParent: false, childWhitelist: [], childFeatures: [], connections: [], createdAt: new Date('2024-08-03T10:00:00Z').getTime() },
  ],
};
