from flask import Flask, request, jsonify, render_template
import random

app = Flask(__name__)

# Basic responses for demonstration purposes
responses = {
    'hello': "Hello! How can I assist you today?",
    'buying': "Buying a property? I can help with that! What type of property are you interested in?",
    'renting': "Looking for a rental? I can help. What location do you have in mind?",
    'sell': "Selling your property? I can provide you with tips to get the best value.",
    'default': "I'm sorry, I didn't understand that."
}

@app.route('/')
def index():
    return render_template('chatbot.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '').lower()
    
    response = responses.get('default')
    for key in responses:
        if key in user_message:
            response = responses[key]
            break
    
    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(debug=True)
