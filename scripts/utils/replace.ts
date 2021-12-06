const replaceInFile = require('replace-in-file');

export const replace = async (filePath, searchStrings, replaceStrings) => {
  const from = searchStrings.map(string => new RegExp(string, 'g'));
  const to = replaceStrings.map(string => string);

  await replaceInFile({
    files: filePath,
    from,
    to,
  });
}



// const replace = require('replace-in-file');

// const [,, filePath, searchString, replaceString ] = process.argv;

// const init = async () => {
//   await replace({
//     files: filePath,
//     from: new RegExp(searchString, 'g'),
//     to: replaceString,
//   });
// }

// init ();