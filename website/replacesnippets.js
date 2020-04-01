const replace = require('replace-in-file');
var fs = require("fs");


//shell.fatal = true; // same as "set -e"

const replacementsStr = fs.readFileSync("snippets", "utf8");
const replacements = JSON.parse(replacementsStr);


for (i in replacements["replacements"]) {
  console.log( replacements["replacements"][i])
  const options = {

    //Glob(s)
    files: [
      'tests/*',
      '../docs/**/*'
    ],

    //Replacement to make (string or regex)
    from: replacements["replacements"][i]["from"],
    to: replacements["replacements"][i]["to"]
  };

  try {
    let changedFiles = replace.sync(options);
    console.log('Modified files:', changedFiles.filter(result => result.hasChanged));
    if (changedFiles.filter(result => result.hasChanged).length == 0) {
      console.log("WARNING: snippet not used")
    }
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
}

