import json

def main():
    """
    Generate SQL INSERT using dollar-quoted strings to avoid quote escaping issues
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
            title = song.get('title', '')
            description = song.get('description', '')
            musical_note = song.get('musicalNote', '')
            filename = song.get('filename', '')

            paragraphs = json.dumps(song.get('paragraphs', []), ensure_ascii=False)
            chorus = json.dumps(song.get('chorus', []), ensure_ascii=False)

            # Use dollar-quoted strings with unique tag: $a$...$a$
            sql_values.append(f"('{song_id}', $a${title}$a$, $a${description}$a$, $a${musical_note}$a$, $a${paragraphs}$a$::jsonb, $a${chorus}$a$::jsonb, $a${filename}$a$)")

        sql = f"""
INSERT INTO himnos (id, title, description, musical_note, paragraphs, chorus, filename)
VALUES
{',\n'.join(sql_values)}
ON CONFLICT (id) DO NOTHING;
"""

        with open(f'uploads_batch_{batch_num + 1}.sql', 'w', encoding='utf-8') as f:
            f.write(sql)

        print(f"Generated batch {batch_num + 1} ({len(batch_songs)} songs)")

    print(f"\nGenerated {num_batches} batch files with dollar-quoted strings")

if __name__ == "__main__":
    main()
