const path = require('path');
const { writeFileSync: write } = require('fs');
const { snakeCase } = require('lodash');

export const addConstant = (pkg: string, dimension: string, val: string) => {
  const CONSTANT_FILE_PATH = path.resolve(__dirname, `../../packages/${pkg}/src/constants.json`);

  let constants = require(CONSTANT_FILE_PATH);
  if (constants[dimension.toLowerCase()]) {
    constants[dimension.toLowerCase()][snakeCase(val).toUpperCase()] = val;
  } else {
    constants[dimension.toLowerCase()] = {};
  }

  write(CONSTANT_FILE_PATH, JSON.stringify(constants, null, 2), 'utf-8')
}