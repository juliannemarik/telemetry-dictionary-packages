const path = require('path');
const { prompt, Separator } = require('inquirer');
const { writeFileSync: write } = require('fs');
const { get, set, camelCase, startCase } = require('lodash');
const { addConstant } = require('./utils/addConstant');

const DICTIONARY_PACKAGE = process.argv.slice(2)[0];
const DICTIONARY_FILE_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}/src/dictionary.json`);
const CONSTANT_FILE_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}/src/constants.json`);

const init = async () => {
  const dimensions = readDimensions();
  let isNew = false;
  let entryPath = Array();
  let entry = {}
  let answers = {};

  for (const dimension of dimensions) {
    const questions = generateQuestions(dimension, entryPath, isNew)
    answers = await prompt(questions);

    const isEmpty = Object.values(answers).length === 1 && !Object.values(answers)[0];

    if(isEmpty) {
      answers = {};
    }
    if (!isEmpty) {
      const key = answers[`${dimension}_new`] ? camelCase(answers[`${dimension}_new`]) : camelCase(answers[dimension]);
      entryPath = dimension === 'category'
        ? [ ...entryPath, key ]
        : [ ...entryPath, `${dimension}_${key}` ];
    }
    if (answers[`${dimension}_new`]) {
      const val = answers[`${dimension}_new`]
      
      answers = { [dimension]: val }
      addConstant(DICTIONARY_PACKAGE, dimension, val)
      isNew = true;
    }
    
    entry = Object.assign(entry, answers)
  }

  const dictionary = require(DICTIONARY_FILE_PATH);
  set(dictionary, entryPath, entry);
  write(DICTIONARY_FILE_PATH, JSON.stringify(dictionary, null, 2), 'utf-8')
}

const getChoices = (dimension, path) => {
  const dictionary = require(DICTIONARY_FILE_PATH);
  return Object.keys(get(dictionary, path)).map(key => {
    if(key.startsWith(`${dimension}_`)) {
      return startCase(key.replace(`${dimension}_`, ''));
    }
  }).filter(Boolean);
}

const readCategories = () => {
  const constants = require(CONSTANT_FILE_PATH).category;
  return Object.values(constants);
}

const readDimensions = () => {
  const constants = require(CONSTANT_FILE_PATH);
  return Object.keys(constants);
}

const generateQuestions = (dimension: string, entryPath: string[], isNew: boolean ) => {
  if (dimension === 'category') {
    const categories = [ ...readCategories(), new Separator(), 'New category'];
    return [
      {
        type: 'list',
        name: dimension,
        message: `${dimension}:`,
        choices: categories,
        loop: false
      },
      {
        type: 'input',
        name: `${dimension}_new`,
        message: `enter a new ${dimension}:`,
        when: (answers) => {
          return answers[dimension].toLowerCase() === `new ${dimension}`;
        }
      }
    ]
  }

  const choices = isNew ? [ { name: 'None', value: null }, `New ${dimension}` ] : [ ...getChoices(dimension, entryPath), new Separator(), { name: 'None', value: null }, `New ${dimension}`];
  return [
    {
      type: 'list',
      name: dimension,
      message: `${dimension}:`,
      choices,
      loop: false
    },
    {
      type: 'input',
      name: `${dimension}_new`,
      message: `enter a new ${dimension}:`,
      when: (answers) => {
        return answers[dimension] && answers[dimension].toLowerCase() === `new ${dimension}`;
      }
    }
  ]
}

init ();
export {};