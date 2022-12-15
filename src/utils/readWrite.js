const fs = require('fs').promises;
const { join } = require('path');

const path = join(__dirname, '../talker.json');

const reader = async () => {
    try {
        const talkers = await fs.readFile(path, { encoding: 'utf-8' });
        return JSON.parse(talkers);
    } catch (e) {
        console.error(e.message);
    }
};

const writer = async (content) => {
    const talkers = await reader();
    const id = talkers[talkers.length - 1].id + 1;
    const updatedTalkers = [...talkers, { id, ...content }];
    await fs.writeFile(path, JSON.stringify(updatedTalkers));
};

const update = async (talker, id) => {
    const { name, age, talk } = talker;
    const talkers = await reader();
    const targetTalkerIndex = talkers.findIndex((t) => t.id === id);
    talkers[targetTalkerIndex].name = name;
    talkers[targetTalkerIndex].age = age;
    talkers[targetTalkerIndex].talk = { ...talk };
    await fs.writeFile(path, JSON.stringify(talkers));
    return talkers[targetTalkerIndex];
};

module.exports = {
    reader,
    writer,
    update,
};