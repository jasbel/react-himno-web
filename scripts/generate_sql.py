import json
import uuid

def main():
    """
    Generate SQL INSERT statements for Supabase from songs.json
    """
    with open('public/songs.json', 'r', encoding='utf-8') as f:
        songs = json.load(f)

    sql_values = []

    for song in songs:
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

    with open('uploads.sql', 'w', encoding='utf-8') as f:
        f.write(sql)

    print(f"Generated SQL for {len(songs)} songs")

if __name__ == "__main__":
    main()
