const fs = require('fs').promises;
const { join } = require('path');

const reader = async () => {
    const path = join(__dirname, '../talker.json');
    try {
        const talkers = await fs.readFile(path, { encoding: 'utf-8' });
        return JSON.parse(talkers);
    } catch (e) {
        console.error(e.message);
    }
};

module.exports = {
    reader,
};