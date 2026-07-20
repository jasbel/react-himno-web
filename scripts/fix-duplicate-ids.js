import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const songs = JSON.parse(fs.readFileSync(`${__dirname}/../public/songs.json`, 'utf8'));

// Track seen IDs
const seenIds = new Map();
const duplicatesFixed = [];

// Fix duplicates
const fixedSongs = songs.map(song => {
  if (seenIds.has(song.id)) {
    const newId = randomUUID();
    duplicatesFixed.push({
      title: song.title,
      oldId: song.id,
      newId: newId
    });
    return { ...song, id: newId };
  }
  seenIds.set(song.id, true);
  return song;
});

console.log('Fixed duplicates:', duplicatesFixed);

// Write fixed JSON
fs.writeFileSync(
  `${__dirname}/../public/songs.json`,
  JSON.stringify(fixedSongs, null, 2),
  'utf8'
);

console.log('✅ Fixed songs.json with new IDs');
