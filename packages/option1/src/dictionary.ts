import dictionaryJson from './dictionary.json';
import { mapKeys, pickBy } from 'lodash';
import util from 'util';

/**
 * NOTES:
 * the following are pros & cons for the following implementation
 * 
 * pros:
 * - we can access read & write methods directly from the dictionary
 * dot notation (i.e. dictionary.category.engagement.action.download.label.content.read())
 * 
 * cons:
 * - doesn't actually work 100% yet - accessing read & write methods
 * currently throws an error because TS doesn't think they exist as 
 * properties on the class
 * - seems a bit excessive and ...to instantiate an instance of Dictionary
 * at every level of the dictionary just to access to the read and write
 * methods
 */

const translations = {
  details: 'a_dimension1',
}

class Dictionary {
  constructor (obj) {
    const keys = Object.keys(obj)
    keys.forEach(key => {
      if (typeof obj[key] === 'object') {
        this[ key ] = new Dictionary(obj[ key ])
      } else {
        this[ key ] = obj[key]
      }
    })
  };

  read () {
    const translated = mapKeys(this, (value, key) => {
      if (translations[key]) {
        return translations[key]
      }
      return key
    })
      
    return pickBy(translated, (value) => {
      return typeof value === 'string'
    })
  }

  write () {
    return pickBy(this, (value) => {
      return typeof value === 'string'
    })
  }
}

const DynamicObject: new <T>(obj:T) => T = function (obj) {
  return new Dictionary(obj)
} as any;

export const dictionary = new DynamicObject(dictionaryJson);

// console.log('DICTIONARY', util.inspect(dictionary, { showHidden: false, depth: null, colors: true }));
// console.log('READ w/Custom Dimension', util.inspect(dictionary.category.engagement.action.download.label.content.details.pdf.read(), { showHidden: false, depth: null, colors: true }));
// console.log('WRITE w/Custom Dimension', util.inspect(dictionary.category.engagement.action.download.label.content.details.pdf.write(), { showHidden: false, depth: null, colors: true }));
