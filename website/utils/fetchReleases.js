const fs = require('fs').promises;
const axios = require('axios');

async function writeReleaseArray(filename) {
    try {
        const response = await axios.get('https://api.github.com/repos/near/near-releases/contents/reports');
        const files = response.data.map(file => file.name);

        await fs.writeFile(filename, JSON.stringify(files, null, 2));
        console.log(`File successfully written: ${filename}`);
    } catch (error) {
        console.error(error);
    }
}

writeReleaseArray('release-files.json');
