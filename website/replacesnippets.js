const replace = require('replace-in-file');

//shell.fatal = true; // same as "set -e"



const options = {

    //Glob(s)
    files: [
      'tests/*',
      '../docs/**/*'
    ],

    //Replacement to make (string or regex)
    from: "<snippet id='shell-install-command'/>",
    to: 'npm install -g near-shell',
  };

  try {
    let changedFiles = replace.sync(options);
    console.log('Modified files:', changedFiles.join(', '));
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
