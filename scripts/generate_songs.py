import os
import json

def main():
    """
    This script indexes all the songs from the json files in the public folder.
    Includes the complete content of each JSON file.
    If description doesn't exist, adds first 48 characters of first paragraph.
    If musicalNote is empty, sets it to "--".
    """
    json_folder = os.path.join(os.path.dirname(__file__), '..', 'public', 'songs_v1')
    index_file = os.path.join(os.path.dirname(__file__), '..', 'public', 'songs.json')
    
    songs_index = []
    
    for filename in os.listdir(json_folder):
        if filename.endswith('.json') and filename != 'index.json' and filename != 'songs.json':
            filepath = os.path.join(json_folder, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                try:
                    song_data = json.load(f)
                    
                    # Add description if it doesn't exist
                    if 'description' not in song_data or not song_data.get('description'):
                        paragraphs = song_data.get('paragraphs', [])
                        if paragraphs and len(paragraphs) > 0:
                            first_paragraph = paragraphs[0].get('paragraph', '')
                            # Remove newlines and take first 48 characters
                            description = first_paragraph.replace('\n', ' ').strip()[:48]
                            song_data['description'] = description
                    
                    # Set musicalNote to "--" if empty or doesn't exist
                    if 'musicalNote' not in song_data or not song_data.get('musicalNote'):
                        song_data['musicalNote'] = "--"
                    
                    # Include the complete JSON content with the filename
                    song_info = {
                        "filename": filename,
                        **song_data
                    }
                    songs_index.append(song_info)
                except json.JSONDecodeError:
                    print(f"Error reading {filename}")
                except Exception as e:
                    print(f"Error processing {filename}: {e}")


    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(songs_index, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()
