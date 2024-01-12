import json
from translate import Translator
import time

def extract_words_from_text(text):
    # Extracts words from the given text
    words = text.split()
    return [word.strip(".,?!\"'()[]{}") for word in words]

def create_json_structure(words):
    # Creates the desired JSON structure for each word with translations to Spanish
    json_structure = [{"word": word[0], "learned": "false"} for word in zip(words)]
    return json_structure

def save_progress(output_file_path, words):
    json_structure = create_json_structure(words)

    # Write to JSON file
    with open(output_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(json_structure, json_file, ensure_ascii=False, indent=2)

def main():
    input_file_path = 'words.txt'
    output_file_path = 'output.json'

    with open(input_file_path, 'r', encoding='utf-8') as file:
        text_content = file.read()

    # Extract words from the text
    words = extract_words_from_text(text_content)
    print(words)
    try:
     # Save progress after translating each word
        save_progress(output_file_path, words)
    except KeyboardInterrupt:
        print("\nScript interrupted. Saving final progress to output.json.")

        # Save the final progress to output.json
        save_progress(output_file_path, words)

    print(f'Conversion complete. JSON file created at {output_file_path}')

if __name__ == "__main__":
    main()
