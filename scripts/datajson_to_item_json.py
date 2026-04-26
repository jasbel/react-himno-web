import os
import json


def main():
    """
    This script gets data from public/songs_quechua/data-quechua.json
    and creates a JSON file for each item in the list.
    The filename will be the value of the 'title' key for each item.
    """
    # Path to the directory containing the script
    script_dir = os.path.dirname(__file__)
    
    # Path to the input JSON file
    input_json_path = os.path.abspath(os.path.join(script_dir, '..', 'public', 'data-song.json'))
    
    # Directory where the new JSON files will be saved
    output_dir = os.path.abspath(os.path.join(script_dir, '..', 'public', 'songs_v0'))
    # output_dir = os.path.dirname(input_json_path)

    try:
        with open(input_json_path, 'r', encoding='utf-8') as f:
            songs_data = json.load(f)

        if not isinstance(songs_data, list):
            print(f"Error: The root of {input_json_path} is not a list.")
            return

        for song in songs_data:
            # Ensure song is a dictionary and has a 'title'
            if isinstance(song, dict) and 'title' in song:
                title_arr = [t.strip() for t in song['title'].split() if t.strip()]
                title_num = [t for t in title_arr if t.isdigit()]
                title_num = title_num[0] if len(title_num) else "0"
                title_str = " ".join([t for t in title_arr if not t.isdigit()])
                title = f"{title_str}"
                # Create a valid filename from the title
                filename = f"{title}.json"
                # Basic sanitization for file paths
                filename = filename.replace('/', ' ').replace('\\', ' ')
                
                output_filepath = os.path.join(output_dir, filename)
                
                with open(output_filepath, 'w', encoding='utf-8') as f_out:
                    json.dump(song, f_out, ensure_ascii=False, indent=4)
                print(f"Created file: {output_filepath}")
            else:
                print(f"Skipping item, not a valid song object with a title: {song}")

    except FileNotFoundError as e:
        print(f"Error: Input file not found at {input_json_path}  {e}")
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {input_json_path}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    main()