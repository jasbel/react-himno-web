import json
import os
import unicodedata

def normalize_text(text):
    # Normalize Unicode characters to NFC form and replace curly quotes
    if isinstance(text, str):
        # Normalize first
        text = unicodedata.normalize('NFKC', text)
        # Replace specific characters
        replacements = {
            'u201c': '"',  # Left double quotation mark
            'u201d': '"',  # Right double quotation mark
            'u2018': "'",  # Left single quotation mark
            'u2019': "'",  # Right single quotation mark
            'u2013': '-',  # En dash
            'u2014': '--', # Em dash
            'u2026': '...', # Ellipsis
        }
        for code, replacement in replacements.items():
            char = chr(int(code[1:], 16))
            text = text.replace(char, replacement)
    return text

def sanitize_song(song):
    # Recursively sanitize all string values in a song object
    if isinstance(song, dict):
        return {k: sanitize_song(v) for k, v in song.items()}
    elif isinstance(song, list):
        return [sanitize_song(item) for item in song]
    elif isinstance(song, str):
        return normalize_text(song)
    else:
        return song

def main():
    # Sanitize songs.json and generate SQL with clean data
    script_dir = os.path.dirname(__file__)
    songs_path = os.path.join(script_dir, '..', 'public', 'songs.json')
    with open(songs_path, 'r', encoding='utf-8') as f:
        songs = json.load(f)

    # Sanitize all songs
    sanitized_songs = [sanitize_song(song) for song in songs]

    batch_size = 30
    num_batches = (len(sanitized_songs) + batch_size - 1) // batch_size

    for batch_num in range(num_batches):
        start = batch_num * batch_size
        end = min(start + batch_size, len(sanitized_songs))
        batch_songs = sanitized_songs[start:end]

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

        script_dir = os.path.dirname(__file__)
        output_path = os.path.join(script_dir, f'uploads_batch_{batch_num + 1}.sql')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(sql)

        print(f"Generated batch {batch_num + 1} ({len(batch_songs)} songs)")

    print(f"\nGenerated {num_batches} batch files with sanitized data")

if __name__ == "__main__":
    main()
