const { prompt } = require('inquirer');
const { addConstant } = require('./utils/addConstant');

const DICTIONARY_PACKAGE = process.argv.slice(2)[0];

const questions = [
  {
    type: 'input',
    name: 'dimension',
    message: 'Please enter the name of the dimension you\'d like to add:'
  }
];

const init = async () => {
  const { dimension } = await prompt(questions);
  addConstant(DICTIONARY_PACKAGE, dimension.toUpperCase(), '');
}

init ();
export {};