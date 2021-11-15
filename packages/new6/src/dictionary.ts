import dictionaryConfig from './dictionary.json';
import * as mapKeysDeep from 'map-keys-deep';

const translations = {
  details: 'dimension1'
}

const DynamicObject: new <T>(obj: T) => T = function (obj) {
  for (const prop in obj) {
    Object.defineProperty(this, prop, {
      get: function () {
        if (typeof obj[prop] === 'object') {
          return mapKeysDeep(obj[prop], (key) => {
            if (translations[key]) {
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
} as any;

export const testingDictionary = new DynamicObject(dictionaryConfig)
// console.log('DICTIONARY', util.inspect(dictionary, { showHidden: false, depth: null, colors: true }));
// console.log('DICTIONARY', util.inspect(dictionary.category.enggement.action.download.details.content.convert(), { showHidden: false, depth: null, colors: true }));
