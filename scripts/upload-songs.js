import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const songs = JSON.parse(fs.readFileSync(`${__dirname}/../public/songs.json`, 'utf8'));

const supabaseUrl = 'https://spbaubkzwljxewzgonjq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwYmF1Ymt6d2xqeGV3emdvbmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDA3MTIsImV4cCI6MjA5NTgxNjcxMn0.9hwPrxHTfwY7W5jlHNl_n2M2UdhkDD9n6JHTWLMv3aU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadSongs() {
  console.log(`Iniciando upload de ${songs.length} himnos...`);

  const songsToInsert = songs.map(song => ({
    id: song.id,
    title: song.title,
    description: song.description || null,
    musical_note: song.musicalNote || null,
    code: song.code || null,
    paragraphs: song.paragraphs || [],
    chorus: song.chorus || [],
    filename: song.filename || null
  }));

  const { data, error } = await supabase
    .from('himnos')
    .insert(songsToInsert)
    .select();

  if (error) {
    console.error('Error insertando:', error);
    process.exit(1);
  }

  console.log(`✅ ${data.length} himnos insertados correctamente`);
  process.exit(0);
}

uploadSongs();
