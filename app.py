from flask import Flask, jsonify, request
from flask_cors import CORS
from automata.fa.dfa import DFA
from automata.fa.nfa import NFA

app = Flask(__name__)
CORS(app)

def create_automata_from_definition(data):
    automata_type = data['type']
    if automata_type == 'DFA':
        return DFA(
            states=data['states'],
            input_symbols=data['alphabet'],
            transitions=data['transitions'],
            initial_state=data['start_state'],
            final_states=data['accepting_states']
        )
    elif automata_type == 'NFA':
        return NFA(
            states=data['states'],
            input_symbols=data['alphabet'],
            transitions=data['transitions'],
            initial_state=data['start_state'],
            final_states=data['accepting_states']
        )
    else:
        print("Automata type is not valid.")
        return None

@app.route('/')
def home():
    dataTest = {
        "type": "DFA",
        "states": {"q0", "q1"},
        "alphabet": {"0", "1"},
        "transitions": {
            "q0": {"0": "q0", "1": "q1"},
            "q1": {"0": "q0", "1": "q1"}
        },
        "start_state": "q0",
        "accepting_states": {"q1"}
    }

    # automata = create_automata_from_definition(dataTest)
    automata = DFA(states=dataTest['states'], input_symbols=dataTest['alphabet'], transitions=dataTest['transitions'], initial_state=dataTest['start_state'], final_states=dataTest['accepting_states'])
    strings = '01001'
    result = automata.accepts(strings)
    return jsonify({'result': result})

@app.route('/create_automata', methods=['POST'])
def create_automata():
    data = request.json
    # automata = create_automata_from_definition(data)
    print(data)
    return jsonify({'success': True})

@app.route('/test_input', methods=['POST'])
def test_input():
    automata = request.json['automata']
    string = request.json['string']
    result = automata.accepts(string)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
