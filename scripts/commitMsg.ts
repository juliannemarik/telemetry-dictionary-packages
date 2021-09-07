const path = require('path');
const { writeFileSync: write, readFileSync: read } = require('fs');

const commitMessage = `
chore(hub): add dictionary entry
  
# This is an automated commit message. In order for CI/CD to work
# correctly, do not modify the format of this message
`

const init = () => {
  const COMMIT_MESSAGE_FILE = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG');
  
  const initialCommitMessage = read(COMMIT_MESSAGE_FILE, 'utf-8');

  console.log('INITIAL', initialCommitMessage,)
  write(COMMIT_MESSAGE_FILE, commitMessage);
}

init();

export {};