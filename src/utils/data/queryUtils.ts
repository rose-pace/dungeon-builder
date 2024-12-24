export const enum Operator {
  AND = 'and',
  OR = 'or',
  NOT = 'not',
}

interface EmptyQueryCriteria<T> {
  where: (criteria: Partial<T>[]) => QueryCriteria<T>;
  any: (criteria: Partial<T>[]) => QueryCriteria<T>;
  none: (criteria: Partial<T>[]) => QueryCriteria<T>;
}

interface QueryCriteria<T> extends EmptyQueryCriteria<T> {
  readonly query: Partial<T>[];
}

export const operatorSymbol = Symbol('operator');
export const criteriaSymbol = Symbol('criteria');

export function queryBuilder<T>(): EmptyQueryCriteria<T> {
  const appendCriteria = (operator: Operator, nextCriteria: Partial<T>[], currentCriteria?: Partial<T>[]): QueryCriteria<T> => {
    const query = [...nextCriteria];
    Reflect.defineProperty(query, operatorSymbol, { value: operator });
    if (currentCriteria) {
      Reflect.defineProperty(currentCriteria, criteriaSymbol, { value: query });
    }

    const currentQuery = currentCriteria ?? query;

    return {
      query: currentQuery,
      where: (criteria: Partial<T>[]) => appendCriteria(Operator.AND, criteria, currentQuery),
      any: (criteria: Partial<T>[]) => appendCriteria(Operator.OR, criteria, currentQuery),
      none: (criteria: Partial<T>[]) => appendCriteria(Operator.NOT, criteria, currentQuery),
    };
  };

  // Return the initial empty query
  return {
    where: (criteria: Partial<T>[]) => appendCriteria(Operator.AND, criteria),
    any: (criteria: Partial<T>[]) => appendCriteria(Operator.OR, criteria),
    none: (criteria: Partial<T>[]) => appendCriteria(Operator.NOT, criteria),
  };
}
