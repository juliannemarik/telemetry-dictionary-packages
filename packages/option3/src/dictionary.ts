import { mapKeys, pickBy } from 'lodash';
import util from 'util';
const deepMapKeys = require('deep-map-keys');
import dictionaryObject from './dictionaryObject';

const translations = {
  details: 'dimension1',
}

const read = () => {
  console.log('READ METHOD', this)
  // const translated = mapKeys(this, (value, key) => {
  //   if (translations[key]) {
  //     return translations[key]
  //   }
  //   return key
  // })
    
  // return pickBy(translated, (value) => {
  //   return typeof value === 'string'
  // })
}


const write = () => {
  console.log('WRITE METHOD');
  // return pickBy(this, (value) => {
  //   return typeof value === 'string'
  // })
}

const init = () => {
  deepMapKeys(dictionaryObject, (key, value) => {
    if(typeof value === 'object') {
      value.read = read;
      value.write = write;
    }
  })

  return dictionaryObject;
}

export const dictionary = init();
// console.log('DICTIONARY', util.inspect(dictionary, { showHidden: false, depth: null, colors: true }));
// console.log('READ w/Custom Dimension', util.inspect(dictionary.category.engagement.action.download.label.content.details.pdf.read(), { showHidden: false, depth: null, colors: true }));
// console.log('WRITE w/Custom Dimension', util.inspect(dictionary.category.engagement.action.download.label.content.details.pdf.write(), { showHidden: false, depth: null, colors: true }));
