import fs from 'fs';

const files = fs.readdirSync('./static/audio/rhodes/');
const map = {};

files.forEach(file => {
    const note = file.split('_')[1];
    map[note.replace('s', '#')] = file;
})

console.log('MAP: ', map);

