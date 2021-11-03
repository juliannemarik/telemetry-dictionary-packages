const path = require('path');
const { prompt } = require('inquirer');
const { copyFileSync: copy, mkdirSync: mkdir } = require('fs');
const { addConstant, addEntry, replace } = require('./utils');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: `Please enter a name for your new dictionary package:`
  },
  {
    type: 'message',
    name: 'categories',
    message: 'Please enter the top-level categories for your dictionary (as a comma-separated list):'
  },
  {
    type: 'message',
    name: 'dimensions',
    message: 'Please enter any additional dimensions you\'d like to log in your dictionary (as a comma-separated list). Note: category, action & label are the defaults.'
  }
];

const init = async () => {
  let { name, categories, dimensions } = await prompt(questions);
  name = name.toLowerCase();
  
  const PACKAGE_DIRECTORY_PATH = path.resolve(__dirname, `../packages/${name}`);
  const TEMPLATE_DIRECTORY_PATH = path.resolve(__dirname, `./fixtures2`);

  // build package structure:
  mkdir(PACKAGE_DIRECTORY_PATH);
  mkdir(`${PACKAGE_DIRECTORY_PATH}/src`);

  // create files from templates
  copy(`${TEMPLATE_DIRECTORY_PATH}/index.ts`, `${PACKAGE_DIRECTORY_PATH}/src/index.ts`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/dictionary.json`, `${PACKAGE_DIRECTORY_PATH}/src/dictionary.json`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/constants.json`, `${PACKAGE_DIRECTORY_PATH}/src/constants.json`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/ts_config.json`, `${PACKAGE_DIRECTORY_PATH}/tsconfig.json`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/package.json`, `${PACKAGE_DIRECTORY_PATH}/package.json`);

  // update files to be package-specific:
  replace(`${PACKAGE_DIRECTORY_PATH}/package.json`, 'PACKAGE_NAME', `${name}`);
  replace(`${PACKAGE_DIRECTORY_PATH}/src/index.ts`, new RegExp(/\/\/\s/), '');

  // add top-level categories to constants and dictionary
  categories.replace(/,\s/g, ',').split(',').forEach(category => {
    if (category) {
      addConstant(name, 'category', category);
      addEntry(name, {}, `category.${category.toLowerCase()}`);
    }
  });

  // add additional custom dimensions to constants
  dimensions.replace(/,\s/g, ',').split(',').forEach(dimension => {
    if (dimension) {
      addConstant(name, dimension, '');
    }
  });
}

init ();
export {};