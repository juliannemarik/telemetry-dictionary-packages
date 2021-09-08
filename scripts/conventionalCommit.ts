const path = require('path');
const { writeFileSync: write, readdirSync: read } = require('fs');
const { prompt } = require('inquirer');

const PACKAGES_DIRECTORY_PATH = path.resolve(__dirname, '../packages');
const COMMIT_MESSAGE_FILE = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG');

const NEW = 'add a new dictionary';
const ADD = 'add dictionary entry/entries';
const UPDATE = 'update dictionary entry/entries';

const packages = [ 'root', ...read(PACKAGES_DIRECTORY_PATH) ];
const descriptions = [ NEW, ADD, UPDATE ]
const types = [ 'feat', 'fix', 'chore', 'docs' ]

const questions = [
  {
    type: 'list',
    name: 'scope',
    message: `What is the scope of this change (i.e. the package name):`,
    choices: packages
  },
  {
    type: 'rawlist',
    name: 'description',
    message: 'Specify the type of change you\'re committing:',
    choices: descriptions,
    when: ({ scope }) => {
      return scope !== 'root';
    }
  },
  {
    type: 'list',
    name: 'type',
    message: 'Select the type of change you\'re committing:',
    choices: types,
    when: ({ scope }) => {
      return scope === 'root';
  }
  },
  {
    type: 'message',
    name: 'description',
    message: 'Write a short description of the changes made to the root directory:',
    when: ({ scope }) => {
        return scope === 'root';
    }
  },
  {
    type: 'confirm',
    name: 'breaking',
    message: 'Is this a breaking change?',
    default: false
  },
  {
    type: 'message',
    name: 'breakingDescription',
    message: 'Describe the breaking change:',
    when: ({ breaking }) => {
      return breaking;
    }
  }
]

const generateCommitMessage = ({ type, scope, description, breaking, breakingDescription }) => {
  if (!type) {
    const typeMap = { [ NEW ] : 'feat', [ ADD ]: 'feat',  [ UPDATE ]: 'fix' }
    type = typeMap[description];
  }

  return `${type}(${scope}): ${description}

${breaking ? `BREAKING CHANGE: ${breakingDescription} \n` : ''}
# This is an automated commit message. In order for CI/CD to work
# correctly, do not modify the format of this message`;
}

const init = async () => {  
  console.log('INIT!!!');
  const answers = await prompt(questions);
  const commitMessage = generateCommitMessage(answers);
  
  write(COMMIT_MESSAGE_FILE, commitMessage);
}

init();

export {};