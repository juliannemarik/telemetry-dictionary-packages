const path = require('path');
const { writeFileSync: write } = require('fs');
const { set } = require('lodash');

export const addEntry = (pkg: string, entry: object, entryPath: string) => {
  const DICTIONARY_FILE_PATH = path.resolve(__dirname, `../../packages/${pkg}/src/dictionary.json`);

  const dictionary = require(DICTIONARY_FILE_PATH);
  set(dictionary, entryPath, entry);
  write(DICTIONARY_FILE_PATH, JSON.stringify(dictionary, null, 2), 'utf-8')
}