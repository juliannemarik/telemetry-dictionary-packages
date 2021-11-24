import dictionaryJson from './dictionary.json';
const deepMapKeys = require('deep-map-keys');
import util from 'util';

const translations = {
  details: 'dimension1'
}

const DynamicObject: new <T>(obj: T) => T = function (obj) {
  let dictionary = {};

  for (const prop in obj) {
    Object.defineProperty(dictionary, prop, {
      get: function () {
        if (typeof obj[prop] === 'object') {
          return deepMapKeys(obj[prop], (key, value) => {
            if (typeof value === 'string' && translations[key]) {
              return translations[key];
            }
            return key;
          });
        }
        return obj[prop];
      },
      enumerable: true,
      configurable: false,
    });
  }

  return dictionary;
} as any;

export const dictionary = new DynamicObject(dictionaryJson)
// console.log('DICTIONARY', util.inspect(dictionary, { showHidden: false, depth: null, colors: true }));
// console.log('READ w/Custom Dimension', util.inspect(dictionary.category.engagement.action.download.label.content.details.pdf.read(), { showHidden: false, depth: null, colors: true }));
// console.log('WRITE w/Custom Dimension', util.inspect(dictionary.category.engagement.action.download.label.content.details.pdf.write(), { showHidden: false, depth: null, colors: true }));
