const path = require('path');
const { writeFileSync: write, readFileSync: read } = require('fs');

let commitMessage = `
chore(hub): add dictionary entry
  
# This is an automated commit message. In order for CI/CD to work
# correctly, do not modify the format of this message
`

const init = () => {
  const COMMIT_MESSAGE_FILE = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG');
  
  const initialCommitMessage = read(COMMIT_MESSAGE_FILE, 'utf-8');

  if (initialCommitMessage === 'chore(release): publish') {
    commitMessage = initialCommitMessage;
  }
  console.log('INITIAL COMMIT MESSAGE', initialCommitMessage,)
  console.log('COMMIT MESSAGE', commitMessage,)

  write(COMMIT_MESSAGE_FILE, commitMessage);
}

init();

export {};