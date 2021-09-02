const replace = require('replace-in-file');

const [,, filePath, searchString, replaceString ] = process.argv;

const init = async () => {
  await replace({
    files: filePath,
    from: new RegExp(searchString, 'g'),
    to: replaceString,
  });
}

init ();