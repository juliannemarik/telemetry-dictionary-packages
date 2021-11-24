import dictionary from './dictionary.json';
import dimensions from './dimensions.json';
import { mapKeys, pickBy } from 'lodash';

export const read = (entry) => {
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

console.log('WRITE', write(dictionary.category.engagement.action.download.label.content));
console.log('READ', read(dictionary.category.engagement.action.download.label.content.details.pdf));
