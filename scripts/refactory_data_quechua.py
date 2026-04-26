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
    input_json_path = os.path.abspath(
        os.path.join(script_dir, "..", "public", "songs_quechua", "data-quechua.json")
    )

    # Directory where the new JSON files will be saved
    output_filepath = input_json_path

    try:
        with open(input_json_path, "r", encoding="utf-8") as f:
            songs_data = json.load(f)

        if not isinstance(songs_data, list):
            print(f"Error: The root of {input_json_path} is not a list.")
            return

        for song in songs_data:
            # Ensure song is a dictionary and has a 'title'
            paragraphs = song.get("paragraphs", [])
            # print("menor a 4 paragraphs")
            if not (len(paragraphs) >= 3):
                # print(song['title'])
                continue

            # print("======================")
            if not (len(paragraphs) % 2 == 0):
                print(song["title"])
                # print(len(paragraphs))
                continue

            chorus = []
            choir = paragraphs.pop(1)
            chorus.append(
                {
                    "id": choir.get("id", ""),
                    "choir": choir.get("paragraph", ""),
                }
            )
            song["chorus"] = chorus

        # with open(output_filepath, "w", encoding="utf-8") as f:
        #     json.dump(
        #         songs_data,
        #         f,
        #         indent=4,
        #         ensure_ascii=False,
        #         separators=(",", ": "),
        #     )

        # print(json.dumps(songs_data[0], indent=4, ensure_ascii=False))

    except FileNotFoundError:
        print(f"Error: Input file not found at {input_json_path}")
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {input_json_path}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    main()
