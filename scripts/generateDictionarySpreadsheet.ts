const path = require('path');
const { mkdirSync: mkdir, copyFileSync: copy, writeFileSync: write } = require('fs');
const { parse } = require('json2csv');

const DICTIONARY_PACKAGE = process.argv.slice(2)[0];
const DICTIONARY_FILE_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}/src/dictionary.json`);
// const DIMENSIONS_FILE_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}/src/dimensions.ts`);
const DICTIONARY_ENTRIES_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}/src/generated/dictionary.csv`);
const PACKAGE_DIRECTORY_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}`);

const getFlattenedEntries = (dictionary:any, flattenedEntries:any = {}, level:number = 0, levels:any = {}):any => {
  level++;
  let entry:any = {};

  levels[level] ? levels[level]++ : levels[level] = 1;

  Object.entries(dictionary).forEach(([ key, value ]:[string, any]) => {
    if(typeof value === 'string') {
      const entryIdx = levels[level];

      entry[key] = value;
      flattenedEntries[`${level}_${entryIdx}`] = entry;
    } else {
      getFlattenedEntries(value, flattenedEntries, level, levels)
    }
  })
  return flattenedEntries;
}

const init = async () => {
  const dictionary = require(DICTIONARY_FILE_PATH);
  const dictionaryDimensions = [ 'category', 'action', 'label', 'details' ]

  // create spreadsheet dicrectory/file
  mkdir(`${PACKAGE_DIRECTORY_PATH}/src/generated`, { recursive: true });
  write(`${PACKAGE_DIRECTORY_PATH}/src/generated/dictionary.csv`, '');
  
  // flatten the json object into individual entries
  const flattenedEntries = Object.values(getFlattenedEntries(dictionary));

  // parse the entries into csv format
  const parsedEntries = parse(flattenedEntries, { fields: dictionaryDimensions });
  write(DICTIONARY_ENTRIES_PATH, parsedEntries)
}

init ();
export {};