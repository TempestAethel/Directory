from flask import Flask, jsonify, request, render_template
import random

app = Flask(__name__)

# Expanded word list
word_list = [
    'python', 'hangman', 'challenge', 'programming', 'openai', 'developer', 
    'interface', 'flask', 'backend', 'javascript', 'frontend', 'algorithm', 
    'function', 'variable', 'integer', 'loop', 'array', 'dictionary', 
    'recursion', 'database', 'machine', 'learning', 'model', 
    'classification', 'clustering', 'regression', 'dataset', 'visualization'
]

@app.route('/')
def index():
    return render_template('index.html')  # This serves the HTML file to the client

@app.route('/get_word', methods=['GET'])
def get_word():
    """Returns a random word from the word_list."""
    word = random.choice(word_list).lower()  # Select a random word
    return jsonify({'word': word})  # Return the word in JSON format

if __name__ == '__main__':
    app.run(debug=True)
