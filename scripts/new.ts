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
    message: 'Please enter the top-level categories for your dictionary as a comma-separated list (optional - press enter to skip):'
  }
];

const init = async () => {
  let { name, categories } = await prompt(questions);
  name = name.toLowerCase();
  
  const PACKAGE_DIRECTORY_PATH = path.resolve(__dirname, `../packages/${name}`);
  const TEMPLATE_DIRECTORY_PATH = path.resolve(__dirname, `./fixtures`);
  const COMMON_DICTIONARY_PATH = path.resolve(__dirname, `../packages/base`);

  // build package structure:
  mkdir(PACKAGE_DIRECTORY_PATH);
  mkdir(`${PACKAGE_DIRECTORY_PATH}/src`);

  // create files from templates
  copy(`${TEMPLATE_DIRECTORY_PATH}/index.ts`, `${PACKAGE_DIRECTORY_PATH}/src/index.ts`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/dictionary.json`, `${PACKAGE_DIRECTORY_PATH}/src/dictionary.json`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/constants.json`, `${PACKAGE_DIRECTORY_PATH}/src/constants.json`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/dimensions.ts`, `${PACKAGE_DIRECTORY_PATH}/src/dimensions.ts`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/ts_config.json`, `${PACKAGE_DIRECTORY_PATH}/tsconfig.json`);
  copy(`${TEMPLATE_DIRECTORY_PATH}/package.json`, `${PACKAGE_DIRECTORY_PATH}/package.json`);

  // update files to be package-specific:
  const { version } = require(`${COMMON_DICTIONARY_PATH}/package.json`);
  replace(`${PACKAGE_DIRECTORY_PATH}/package.json`, [ 'PACKAGE_NAME', 'COMMON_VERSION' ], [ `${name}`, `${version}` ]);

  // un-comment file(s)
  const commentRegex = new RegExp(/\/\/\s/);
  replace(`${PACKAGE_DIRECTORY_PATH}/src/index.ts`, [ commentRegex ], [ '' ]);

  // add top-level categories to constants and dictionary
  categories.replace(/,\s/g, ',').split(',').forEach(category => {
    if (category) {
      addConstant(name, 'category', category);
      addEntry(name, {}, `category.${category.toLowerCase()}`);
    }
  });
}

init ();
export {};