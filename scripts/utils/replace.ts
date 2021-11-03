const replaceInFile = require('replace-in-file');

export const replace = async (filePath, searchString, replaceString) => {
  await replaceInFile({
    files: filePath,
    from: new RegExp(searchString, 'g'),
    to: replaceString,
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