import json

def main():
    """
    Generate SQL INSERT statements in batches for Supabase
    """
    with open('public/songs.json', 'r', encoding='utf-8') as f:
        songs = json.load(f)

    batch_size = 30
    num_batches = (len(songs) + batch_size - 1) // batch_size

    for batch_num in range(num_batches):
        start = batch_num * batch_size
        end = min(start + batch_size, len(songs))
        batch_songs = songs[start:end]

        sql_values = []

        for song in batch_songs:
            song_id = song.get('id', '')
            title = song.get('title', '').replace("'", "''")
            description = song.get('description', '').replace("'", "''")
            musical_note = song.get('musicalNote', '').replace("'", "''")
            filename = song.get('filename', '').replace("'", "''")

            paragraphs = json.dumps(song.get('paragraphs', []), ensure_ascii=False).replace("'", "''")
            chorus = json.dumps(song.get('chorus', []), ensure_ascii=False).replace("'", "''")

            sql_values.append(f"('{song_id}', '{title}', '{description}', '{musical_note}', '{paragraphs}'::jsonb, '{chorus}'::jsonb, '{filename}')")

        sql = f"""
INSERT INTO himnos (id, title, description, musical_note, paragraphs, chorus, filename)
VALUES
{',\n'.join(sql_values)}
ON CONFLICT (id) DO NOTHING;
"""

        with open(f'uploads_batch_{batch_num + 1}.sql', 'w', encoding='utf-8') as f:
            f.write(sql)

        print(f"Generated batch {batch_num + 1} ({len(batch_songs)} songs)")

    print(f"\nGenerated {num_batches} batch files")

if __name__ == "__main__":
    main()
