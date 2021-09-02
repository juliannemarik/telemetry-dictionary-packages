const path = require('path');
const { writeFileSync: write } = require('fs');
const { set } = require('lodash');
const { singular } = require('pluralize');

const DICTIONARY_PATH = path.resolve(process.cwd(), './src/dictionary.ts');
const ROLLED_DICTIONARY_PATH = path.resolve(process.cwd(), './src/rollup.json');

const init = () => {
  let output = {};
  
  const dictionary = require(DICTIONARY_PATH).default;

  const categories:any = Object.entries(dictionary);
  categories.forEach(([ categoryKey, category ]) => {
    output = { ...output, ...rollup(categoryKey, category, set({}, 'category', category.id)) }
  })

  write(ROLLED_DICTIONARY_PATH, JSON.stringify(output, null, 2), 'utf-8');
}

const rollup = (key:string, value:any, configAcc:object, rollupAcc:object = {}) => {
  const rollupElements = Object.entries(value).filter(([ key1, value1 ]:any) => {
    return typeof value1 === 'object';
  });

  if (!rollupElements.length) {
    set(rollupAcc, key, { ...configAcc });
  } else {
    rollupElements.forEach(([ key2, value2 ]:any) => {  
      Object.entries(value2).forEach(([ key3, value3 ]:any) => {
        set(configAcc, singular(key2), value3.id);
        rollup([ key, key3 ].join('.'), value3, configAcc, rollupAcc)
      })
    });
  }

  return rollupAcc;
}

init();

export {};