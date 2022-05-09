import { mapKeys, pickBy } from 'lodash';

// testing
export function read (entry) {
  const pruned = write(entry);
  return mapKeys(pruned, (value, key) => {
    if (this.dimensionsMap[key]) {
      return `dimension${this.dimensionsMap[key]}`
    }
    return key
  });
}

export function write (entry) {
  return pickBy(entry, val => {
    return typeof val === 'string'
  })
}