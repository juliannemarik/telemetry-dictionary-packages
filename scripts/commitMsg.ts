const path = require('path');
const { writeFileSync: write } = require('fs');

const commitMessage = `
chore(hub): add dictionary entry
  
# This is an automated commit message. In order for CI/CD to work
# correctly, do not modify the format of this message
`

const init = () => {
  const COMMIT_MESSAGE_FILE = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG');
  
  console.log('COMMIT MESSAGE FILE', COMMIT_MESSAGE_FILE)
  write(COMMIT_MESSAGE_FILE, commitMessage);
}

init();

export {};