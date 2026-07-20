const fs = require('fs');
const path = require('path');

const songs = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/songs.json'), 'utf8'));

const transformed = songs.map(song => ({
  id: song.id,
  title: song.title,
  description: song.description || '',
  musical_note: song.musicalNote || '',
  paragraphs: song.paragraphs || [],
  chorus: song.chorus || [],
  filename: song.filename || ''
}));

// Generate SQL INSERT
const sqlValues = transformed.map(song => {
  const paragraphsJson = JSON.stringify(song.paragraphs).replace(/'/g, "''");
  const chorusJson = JSON.stringify(song.chorus).replace(/'/g, "''");

  return `('${song.id}', '${song.title.replace(/'/g, "''")}', '${song.description.replace(/'/g, "''")}', '${song.musical_note.replace(/'/g, "''")}', '${paragraphsJson}'::jsonb, '${chorusJson}'::jsonb, '${song.filename.replace(/'/g, "''")}')`;
}).join(',\n');

const sql = `
INSERT INTO himnos (id, title, description, musical_note, paragraphs, chorus, filename)
VALUES
${sqlValues}
ON CONFLICT (id) DO NOTHING;
`;

console.log(sql);
