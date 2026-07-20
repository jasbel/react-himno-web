import json
import uuid
import sys

import os

try:
    songs_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'songs.json')
    with open(songs_path, 'r', encoding='utf-8') as f:
        songs = json.load(f)

    invalid = []
    for song in songs:
        try:
            uuid.UUID(song['id'])
        except (ValueError, KeyError):
            invalid.append(song.get('id', 'NO_ID'))

    if invalid:
        print(f'Found {len(invalid)} invalid UUIDs:')
        for i in invalid[:5]:
            print(f'  - {i}')
        sys.exit(1)
    else:
        print('All UUIDs are valid')

except Exception as e:
    print(f'Error: {e}')
    sys.exit(1)
