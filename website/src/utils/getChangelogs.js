const fs = require('fs').promises;
const axios = require('axios');

async function main() {
  try {
    const response = await axios.get(
      'https://api.github.com/repos/near/near-releases/contents/reports'
    );
    const files = response.data.map((file) => file.name);

    await fs.writeFile('./src/utils/changelogs.json', JSON.stringify(files, null, 2));
    console.log('File successfully written: changelogs.json');
  } catch (error) {
    console.error(error);
  }
}

main();
