import os
import json

def main():
    """
    This script indexes all the songs from the json files in the public/jsons folder.
    """
    json_folder = os.path.join(os.path.dirname(__file__), '..', 'public', 'jsons')
    index_file = os.path.join(json_folder, 'index.json')
    
    songs_index = []
    
    for filename in os.listdir(json_folder):
        if filename.endswith('.json') and filename != 'index.json':
            filepath = os.path.join(json_folder, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                try:
                    song_data = json.load(f)
                    
                    description = ' '.join([p['paragraph'] for p in song_data.get('paragraphs', [])]).replace('\n', ' ')
                    
                    song_info = {
                        "num_song": song_data.get("num_song", ""),
                        "title": song_data.get("title", ""),
                        "description": description,
                        "musicalNote": song_data.get("musicalNote", ""),
                        "filename": filename
                    }
                    songs_index.append(song_info)
                except json.JSONDecodeError:
                    print(f"Error reading {filename}")
                except KeyError as e:
                    print(f"Key {e} not found in {filename}")

    # Sort songs by num_song, handling possible non-numeric values
    songs_index.sort(key=lambda s: int(s['num_song']) if s['num_song'].isdigit() else float('inf'))

    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(songs_index, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
