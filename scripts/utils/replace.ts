const replaceInFile = require('replace-in-file');

export const replace = async (filePath, searchString, replaceString) => {
  await replaceInFile({
    files: filePath,
    from: new RegExp(searchString, 'g'),
    to: replaceString,
  });
}