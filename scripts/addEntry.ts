const path = require('path');
const util = require('util')
const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const { writeFileSync: write } = require('fs');
const { get, set, camelCase, startCase } = require('lodash');
const { addConstant } = require('./utils/addConstant');

const { prompt, Separator } = inquirer;
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const DICTIONARY_PACKAGE = process.argv.slice(2)[0];
const DICTIONARY_FILE_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}/src/dictionary.json`);
const CONSTANT_FILE_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}/src/constants.json`);

const init = async () => {
  const dictionary = require(DICTIONARY_FILE_PATH);
  const dimensions = readDimensions();
  let isNew = false;
  let entryPath = Array();
  let entry = {}
  let answers = {};

  for (let dimension of dimensions) {
    dimension = dimension.toLowerCase();
    const questions = generateQuestions(dimension, entryPath, isNew)
    answers = await prompt(questions);

    const isEmpty = Object.values(answers).length === 1 && !Object.values(answers)[0];

    if(isEmpty) {
      answers = {};
    } else {
      const key = answers[`${dimension}_new`] ? camelCase(answers[`${dimension}_new`]) : camelCase(answers[dimension]);
      entryPath = [ ...entryPath, dimension, key ]
    }

    if (answers[`${dimension}_new`]) {
      const val = answers[`${dimension}_new`]
      
      answers = { [dimension]: val }
      addConstant(DICTIONARY_PACKAGE, dimension, val)
      isNew = true;
    }
    
    entry = Object.assign(entry, answers)
  }
  
  set(dictionary, [ ...entryPath, '_' ], { ...entry });
  write(DICTIONARY_FILE_PATH, JSON.stringify(dictionary, null, 2), 'utf-8')
  console.log(`\nSuccess! The following entry (and its intermediaries) was added to your dictionary: \n\n${util.inspect(entry, { showHidden: false, depth: null, colors: true })}\n\nat the following path: "${[ ...entryPath, '_' ].join('.')}"\n`);
}

const getChoices = (dimension, path) => {
  const dictionary = require(DICTIONARY_FILE_PATH);

  return Object.keys(get(dictionary, [ ...path, dimension ], {})).map(key => {
    if(!key.startsWith(`_`)) {
      return startCase(key);
    }
  }).filter(Boolean);
}

const searchConstants = (answers, input) => {
  const dimension = Object.keys(answers)[0];
  const constants = readConstants(dimension);

  input = input || '';

  return new Promise(function (resolve) {
    setTimeout(function () {
      var fuzzyResult = fuzzy.filter(input, constants);
      resolve(fuzzyResult.map(el => el.original));
    }, 0);
  })
}

const readConstants = (dimension: string) => {
  const constants = require(CONSTANT_FILE_PATH)[dimension];
  return Object.values(constants);
}

const readDimensions = () => {
  const constants = require(CONSTANT_FILE_PATH);
  return Object.keys(constants);
}

const generateQuestions = (dimension: string, entryPath: string[], isNew: boolean ) => {  
  if (dimension === 'category') {
    return [
      {
        type: 'list',
        name: dimension,
        message: `${dimension}:`,
        choices: readConstants(dimension),
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

  const choices = isNew 
    ? [ { name: 'None', value: null }, { name: `New ${startCase(dimension)}`, value: `new_${dimension}`} ] 
    : [ ...getChoices(dimension, entryPath), new Separator(), { name: 'None', value: null }, { name: `New ${startCase(dimension)}`, value: `new_${dimension}`} ];

  return [
    {
      type: 'list',
      name: dimension,
      message: `${dimension}:`,
      choices,
      loop: false
    },
    {
      type: 'autocomplete',
      name: `${dimension}_new`,
      message: `enter a new ${dimension} or use autosuggest to select an existing ${dimension} constants:`,
      suggestOnly: true,
      emptyText: `Nothing found. Complete and press enter to create a new ${dimension}`,
      source: searchConstants,
      pageSize: 5,
      loop: false,
      when: (answers) => {
        return answers[dimension] && answers[dimension] === `new_${dimension}`;
      }
    }
  ]
}

init ();
export {};