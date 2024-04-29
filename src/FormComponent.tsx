import React from 'react';

export interface Transition {
    [key: string]: string[];
}

export interface Input_Automata {
    type: string;
    states: string[];
    alphabet: string[];
    transitions: { [key: string]: Transition };
    start_state: string;
    accepting_states: string[];
    strings: string;
}

interface FormProps {
    automata: Input_Automata;
    setAutomata: React.Dispatch<React.SetStateAction<Input_Automata>>;
    isUseinputType: boolean;
}

const FormComponent: React.FC<FormProps> = ({ automata, setAutomata , isUseinputType}) => {
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value
        if (newType){
            setAutomata(prevAutomata => ({
                ...prevAutomata,
                type: newType
            }));
        }
    };

    const handleStartStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStartState = e.target.value
        if (newStartState) {
            setAutomata(prevAutomata => ({
                ...prevAutomata,
                start_state: newStartState
            }));
        }
    };

    const handleAddState = () => {
        const newState = prompt("Masukkan nama state baru:");
        if (newState) {
            setAutomata(prevAutomata => ({
                ...prevAutomata,
                states: [...prevAutomata.states, newState],
                transitions: {
                    ...prevAutomata.transitions,
                    [newState]: Object.fromEntries(
                        prevAutomata.alphabet.map(alphabet => [alphabet, []])
                    )
                }
            }));
            console.log(automata);
        }
    };

    const handleAddAlphabet = () => {
        const newAlphabet = prompt("Masukkan Alphabet baru:");
        if (newAlphabet) {
            setAutomata(prevAutomata => ({
                ...prevAutomata,
                alphabet: [...prevAutomata.alphabet, newAlphabet],
                transitions: Object.fromEntries(
                    prevAutomata.states.map(state => [
                        state,
                        { ...prevAutomata.transitions[state], [newAlphabet]: [] }
                    ])
                )
            }));
        }
    };

    const handleAddAcceptingState = () => {
        const acceptingState = prompt("Pilih accepting state:");
        if (acceptingState && automata.states.includes(acceptingState)) {
            setAutomata(prevAutomata => ({
                ...prevAutomata,
                accepting_states: [...prevAutomata.accepting_states, acceptingState]
            }));
        } else {
            alert("State yang dimasukkan bukan merupakan state yang valid.");
        }
    };

    const handleAddTransition = () => {
        const stateFrom = prompt("Masukkan state asal:");
        const stateTo = prompt("Masukkan state tujuan:");
        let alphabet = prompt("Masukkan alphabet untuk transisi:");

        if (alphabet == "epsilon" || alphabet == null){
            alphabet = ""
        }

        if (stateFrom && stateTo) {
            setAutomata(prevAutomata => ({
                ...prevAutomata,
                transitions: {
                    ...prevAutomata.transitions,
                    [stateFrom]: {
                        ...prevAutomata.transitions[stateFrom],
                        [alphabet]: [...(prevAutomata.transitions[stateFrom]?.[alphabet] || []), stateTo]
                    }
                }
            }));
        }
    };

    const handleDFATransition = (stateFrom: string, alphabet: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        const stateTo = e.target.value;
        setAutomata(prevAutomata => {
            const newState = {
                ...prevAutomata,
                transitions: {
                    ...prevAutomata.transitions,
                    [stateFrom]: {
                        ...prevAutomata.transitions[stateFrom],
                        [alphabet]: stateTo ?
                            [stateTo] :
                            prevAutomata.transitions[stateFrom][alphabet].filter(item => item !== stateTo)
                    }
                }
            };

            if (!stateTo) {
                delete newState.transitions[stateFrom][alphabet];
            }

            return newState;
        });
    };

    return (
        <div>
            <div className='w-full'>
                <div>
                    {isUseinputType && (
                        <div className='rounded-md bg-gray-950 bg-opacity-50 my-4 py-2 pl-2'>
                            <p className='text-xl mb-1 font-bold'>Jenis Automata</p>
                            <hr className='mb-4 w-36'/>
                            <select title='Input Tipe' className='block w-36 h-12 p-3 rounded-md bg-gray-600' value={automata.type} onChange={handleTypeChange}>
                                <option value="">Pilih jenis</option>
                                <option value="DFA">DFA</option>
                                <option value="NFA">NFA</option>
                                <option value="ENFA">E-NFA</option>
                            </select>
                        </div>
                    )}

                    <div className='rounded-md bg-gray-950 bg-opacity-50 my-4 py-2 pl-2'>
                        <p className='text-xl mb-1 font-bold'>State</p>
                        <hr className='mb-4 w-36'/>
                        <button className='block bg-blue-950' type="button" onClick={handleAddState}>Tambah State</button>
                        <div className='my-2 flex gap-3'>
                            {automata.states.map(state => (
                                <div className='rounded bg-green-900 w-fit p-3'>{state}</div>
                            ))}
                        </div>
                    </div>

                    <div className='rounded-md bg-gray-950 bg-opacity-50 my-4 py-2 pl-2'>
                        <p className='text-xl mb-1 font-bold'>Alphabet</p>
                        <hr className='mb-4 w-36'/>
                        <button className='block bg-blue-950' type="button" onClick={handleAddAlphabet}>Tambah Alphabet</button>
                        <div className='my-2 flex gap-3'>
                            {automata.alphabet.map(alphabet => (
                                <div className='rounded bg-green-900 w-fit p-3'>{alphabet}</div>
                            ))}
                        </div>
                    </div>

                    <div className='rounded-md bg-gray-950 bg-opacity-50 my-4 py-2 pl-2'>
                        <p className='text-xl mb-1 font-bold'>Start State</p>
                        <hr className='mb-4 w-36'/>
                        <select title='Input Start State' className='block w-36 h-12 p-3 rounded-md bg-gray-600' value={automata.start_state} onChange={handleStartStateChange}>
                            <option value="">Pilih Start State</option>
                            {automata.states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className='rounded-md bg-gray-950 bg-opacity-50 my-4 py-2 pl-2'>
                        <p className='text-xl mb-1 font-bold'>Accepting State</p>
                        <hr className='mb-4 w-36' />
                        <button className='block bg-blue-950' type="button" onClick={handleAddAcceptingState}>Tambah Accepting
                            State
                        </button>
                        <div className='flex gap-3 mt-2'>
                            {automata.accepting_states.map(state => (
                                <div className='rounded bg-green-900 w-fit p-3'>{state}</div>
                            ))}
                        </div>
                    </div>

                    {automata.type == "DFA" ? (
                        <div className='rounded-md bg-gray-950 bg-opacity-50 my-4 pb-4 py-2 pl-2'>
                            <p className='text-xl mb-1 font-bold'>Transition</p>
                            <hr className='mb-4 w-36'/>
                            <div>
                                {Object.entries(automata.states).map(([index, state_name]) =>
                                    <div className={'flex gap-3 pl-2 mt-3'}>
                                        <div key={index}>{state_name}</div>
                                        <div className={"grid grid-cols-4 gap-3"}>
                                            {Object.entries(automata.alphabet).map(([index, alphabetName]) => (
                                                <div className='flex gap-1'>
                                                    <div key={index}>{alphabetName}</div>
                                                    <select title='Input Transisi' className='w-10 bg-gray-600' onChange={handleDFATransition(state_name, alphabetName)}>
                                                        <option key={index} value={""}></option>
                                                        {automata.states.map((alphabetName, index) => (
                                                            <option key={index} value={alphabetName}>{alphabetName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='rounded-md bg-gray-950 bg-opacity-50 my-4 py-2 pl-2'>
                            <p className='text-xl mb-1 font-bold'>Transition</p>
                            <hr className='mb-4 w-36' />
                            <button className='block bg-blue-950' type="button" onClick={handleAddTransition}>Tambah Transition
                            </button>
                            <div className={"py-2"}>
                                {Object.entries(automata.transitions).map(([stateFrom, transitions]) => (
                                    <ul key={stateFrom}>
                                        {Object.entries(transitions).map(([alphabet, stateTo]) => (
                                            stateTo.length > 0 && (
                                                <li className={"mb-2"} key={`${stateFrom}-${alphabet}-${stateTo}`}>
                                                    {stateFrom} {'->'} {stateTo} ({alphabet})
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                ))}
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    )
}

export default FormComponent