import { mapKeys, pickBy } from 'lodash';
import dictionaryConfig from './dictionary.json';

const translations = {
  details: 'dimension1'
}

export class Hello {
  [key: string]: any;
  
  constructor (obj) {
    const keys = Object.keys(obj)
    keys.forEach(key => {
      if (typeof obj[key] === 'object') {
        this[ key ] = new Hello(obj[ key ])
      } else {
        this[ key ] = obj[key]
      }
    })
  };

  convert () {
    const translated = 
      mapKeys(this, (value, key) => {
        if (translations[key]) {
          return translations[key]
        }
        return key
      })
      
      return pickBy(translated, (value) => {
        return typeof value === 'string'
      })
  }
}

export const testingDictionary = new Hello(dictionaryConfig)
// console.log('DICTIONARY', util.inspect(dictionary, { showHidden: false, depth: null, colors: true }));
// console.log('DICTIONARY', util.inspect(dictionary.category.enggement.action.download.details.content.convert(), { showHidden: false, depth: null, colors: true }));
