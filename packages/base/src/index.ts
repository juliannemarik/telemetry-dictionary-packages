import { mapKeys, pickBy } from 'lodash';

export const read = (entry, dimensions) => {
  const pruned = write(entry);
  return mapKeys(pruned, (value, key) => {
    if (dimensions[key]) {
      return `dimension${dimensions[key]}`
    }
    return key
  });
}

export const write = (entry) => {
  return pickBy(entry, val => {
    return typeof val === 'string'
  })
}