import { mapKeys, pickBy } from 'lodash';

export function read (entry) {
  const pruned = write(entry);
  return mapKeys(pruned, (value, key) => {
    if (this.dimensions[key]) {
      return `dimension${this.dimensions[key]}`
    }
    return key
  });
}

export function write (entry) {
  return pickBy(entry, val => {
    return typeof val === 'string'
  })
}