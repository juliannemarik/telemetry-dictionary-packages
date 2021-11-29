const path = require('path');
const { prompt } = require('inquirer');
const { addConstant } = require('./utils/addConstant');

const DICTIONARY_PACKAGE = process.argv.slice(2)[0];
const CONSTANT_FILE_PATH = path.resolve(__dirname, `../packages/${DICTIONARY_PACKAGE}/src/constants.json`);

const readDimensions = () => {
  const constants = require(CONSTANT_FILE_PATH);
  return Object.keys(constants);
}

const questions = [
  {
    type: 'list',
    name: 'dimension',
    message: 'Please select the dimension you\'d like to add a constant for:',
    choices: readDimensions(),
    loop: false
  },
  {
    type: 'input',
    name: 'value',
    message: 'Please enter the value:'
  }
];

const init = async () => {
  const { dimension, value } = await prompt(questions);
  addConstant(DICTIONARY_PACKAGE, dimension, value);
}

init ();
export {};