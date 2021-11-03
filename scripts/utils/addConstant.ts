const path = require('path');
const { writeFileSync: write } = require('fs');
const { startCase, snakeCase } = require('lodash');

export const addConstant = (pkg: string, dimension: string, val: string) => {
  const CONSTANT_FILE_PATH = path.resolve(__dirname, `../../packages/${pkg}/src/constants.json`);

  let constants = require(CONSTANT_FILE_PATH);
  if (constants[dimension.toUpperCase()]) {
    constants[dimension.toUpperCase()][snakeCase(val).toUpperCase()] = startCase(val);
  } else {
    constants[dimension.toUpperCase()] = {};
  }

  write(CONSTANT_FILE_PATH, JSON.stringify(constants, null, 2), 'utf-8')
}