import os
import json
import uuid

def main():
    """
    This script updates the id field of each song JSON in public/songs_v1/
    with a valid UUID. Replaces numeric or invalid IDs with proper UUIDs.
    """
    json_folder = os.path.join(os.path.dirname(__file__), '..', 'public', 'songs_v1')

    updated_count = 0
    skipped_count = 0

    for filename in os.listdir(json_folder):
        if filename.endswith('.json') and filename not in ['index.json', 'songs.json']:
            filepath = os.path.join(json_folder, filename)

            with open(filepath, 'r', encoding='utf-8') as f:
                try:
                    song_data = json.load(f)

                    current_id = song_data.get('id', '')

                    # Check if ID is a valid UUID
                    try:
                        uuid.UUID(str(current_id))
                        # Valid UUID, skip
                        skipped_count += 1
                        continue
                    except ValueError:
                        # Invalid UUID, generate new one
                        new_id = str(uuid.uuid4())
                        song_data['id'] = new_id

                        # Write back to file
                        with open(filepath, 'w', encoding='utf-8') as f_out:
                            json.dump(song_data, f_out, ensure_ascii=False, indent=4)

                        print(f"Updated {filename}: {current_id} -> {new_id}")
                        updated_count += 1

                except json.JSONDecodeError as e:
                    print(f"Error reading {filename}: {e}")
                except Exception as e:
                    print(f"Error processing {filename}: {e}")

    print(f"\nSummary: {updated_count} updated, {skipped_count} skipped")

if __name__ == "__main__":
    main()
