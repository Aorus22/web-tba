import React, { useState, useEffect } from 'react';

interface Transition {
  [key: string]: string[];
}

interface Input_Automata {
  type: string;
  states: string[];
  alphabet: string[];
  transitions: { [key: string]: Transition };
  start_state: string;
  accepting_states: string[];
  strings: string;
}

const Nomor_4: React.FC = () => {
  // const [jsonInput1, setJsonInput1] = useState<string>('');
  // const [jsonInput2, setJsonInput2] = useState<string>('');
  const [svgResponse1, setSvgResponse1] = useState<string>('');
  const [svgResponse2, setSvgResponse2] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  // const textareaRef1 = useRef<HTMLTextAreaElement>(null);
  // const textareaRef2 = useRef<HTMLTextAreaElement>(null);

  const [automata1, setAutomata1] = useState<Input_Automata>({
    type: "DFA",
    states: [],
    alphabet: [],
    transitions: {},
    start_state: "",
    accepting_states: [],
    strings: ""
  });

  const [automata2, setAutomata2] = useState<Input_Automata>({
    type: "DFA",
    states: [],
    alphabet: [],
    transitions: {},
    start_state: "",
    accepting_states: [],
    strings: ""
  });

  const handleStartStateChange1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStartState = e.target.value
    if (newStartState) {
      setAutomata1(prevAutomata => ({
        ...prevAutomata,
        start_state: newStartState
      }));
    }
  };

  const handleAddState1 = () => {
    const newState = prompt("Masukkan nama state baru:");
    if (newState) {
      setAutomata1(prevAutomata => ({
        ...prevAutomata,
        states: [...prevAutomata.states, newState]
      }));
      console.log(automata1);
    }
  };

  const handleAddAlphabet1 = () => {
    const newAlphabet = prompt("Masukkan Alphabet baru:");
    if (newAlphabet) {
      setAutomata1(prevAutomata => ({
        ...prevAutomata,
        alphabet: [...prevAutomata.alphabet, newAlphabet]
      }));
    }
  }

  const handleAddAcceptingState1 = () => {
    const acceptingState = prompt("Pilih accepting state:");
    if (acceptingState && automata1.states.includes(acceptingState)) {
      setAutomata1(prevAutomata => ({
        ...prevAutomata,
        accepting_states: [...prevAutomata.accepting_states, acceptingState]
      }));
    } else {
      alert("State yang dimasukkan bukan merupakan state yang valid.");
    }
  };

  const handleAddTransition1 = () => {
    const stateFrom = prompt("Masukkan state asal:");
    const stateTo = prompt("Masukkan state tujuan:");
    let alphabet = prompt("Masukkan alphabet untuk transisi:");

    if (alphabet == "epsilon" || alphabet == null){
      alphabet = ""
    }

    if (stateFrom && stateTo) {
      setAutomata1(prevAutomata => ({
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

  const handleDFATransition1 = (stateFrom: string, alphabet: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateTo = e.target.value;
    setAutomata1(prevAutomata => {
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

  const handleStartStateChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStartState = e.target.value
    if (newStartState) {
      setAutomata2(prevAutomata => ({
        ...prevAutomata,
        start_state: newStartState
      }));
    }
  };

  const handleAddState2 = () => {
    const newState = prompt("Masukkan nama state baru:");
    if (newState) {
      setAutomata2(prevAutomata => ({
        ...prevAutomata,
        states: [...prevAutomata.states, newState]
      }));
      console.log(automata1);
    }
  };

  const handleAddAlphabet2 = () => {
    const newAlphabet = prompt("Masukkan Alphabet baru:");
    if (newAlphabet) {
      setAutomata2(prevAutomata => ({
        ...prevAutomata,
        alphabet: [...prevAutomata.alphabet, newAlphabet]
      }));
    }
  }

  const handleAddAcceptingState2 = () => {
    const acceptingState = prompt("Pilih accepting state:");
    if (acceptingState && automata1.states.includes(acceptingState)) {
      setAutomata2(prevAutomata => ({
        ...prevAutomata,
        accepting_states: [...prevAutomata.accepting_states, acceptingState]
      }));
    } else {
      alert("State yang dimasukkan bukan merupakan state yang valid.");
    }
  };

  const handleAddTransition2 = () => {
    const stateFrom = prompt("Masukkan state asal:");
    const stateTo = prompt("Masukkan state tujuan:");
    let alphabet = prompt("Masukkan alphabet untuk transisi:");

    if (alphabet == "epsilon" || alphabet == null){
      alphabet = ""
    }

    if (stateFrom && stateTo) {
      setAutomata2(prevAutomata => ({
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

  const handleDFATransition2 = (stateFrom: string, alphabet: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateTo = e.target.value;
    setAutomata2(prevAutomata => {
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

  // useEffect(() => {
  //   adjustTextareaHeight(textareaRef1);
  //   adjustTextareaHeight(textareaRef2);
  // }, [jsonInput1, jsonInput2]);

  // const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
  //   if (ref.current) {
  //     ref.current.style.height = 'auto';
  //     ref.current.style.height = `${ref.current.scrollHeight}px`;
  //   }
  // };

  // const handleChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setJsonInput1(event.target.value);
  // };
  //
  // const handleChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setJsonInput2(event.target.value);
  // };

  const handleChange1 = async () => {
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automata1)
      };
      const res = await fetch('http://localhost:5000/draw_diagram', requestOptions);
      const data = await res.json();
      setSvgResponse1(data.svgResult);
      console.log(automata1)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const   handleChange2 = async () => {
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automata2)
      };
      const res = await fetch('http://localhost:5000/draw_diagram', requestOptions);
      const data = await res.json();
      setSvgResponse2(data.svgResult);
      console.log(automata2)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleChange1()
    handleChange2()
  }, [automata1, automata2]);

  const checkTransitions = (automata: Input_Automata) => {
    if (automata.type === 'DFA') {
      const hasEmptyTransition = Object.values(automata.transitions).some((transition) => {
        return Object.keys(transition).length === 0 || Object.values(transition).some((toStates) => toStates.length === 0);
      });

      if (Object.keys(automata.transitions).length === 0 || hasEmptyTransition) {
        alert('Harap isi semua transisi.');
        return false;
      }
      return true;
    }
    return false;
  };
  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (checkTransitions(automata1) && checkTransitions(automata2)) {
        const combinedInputs = {
          "dfa1": automata1,
          "dfa2": automata2
        };

        const requestOptions: RequestInit = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(combinedInputs)
        };

        const res = await fetch('http://localhost:5000/nomor_4', requestOptions);
        const data = await res.json();
        setResponse(data.result);
      } else {
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div>
        <div className="flex justify-center items-center gap-20 h-fit">
          <div className="w-full max-w-md">
            <div>
              <div className='my-4 border py-2 pl-2'>
                <p className='mb-2 text-xl'>State</p>
                <button className='block' type="button" onClick={handleAddState1}>Tambah State</button>
                <div className='my-2 flex gap-3'>
                  {automata1.states.map(state => (
                      <div className='rounded bg-green-900 w-fit p-3'>{state}</div>
                  ))}
                </div>
              </div>

              <div className='my-4 border py-2 pl-2'>
                <p className='mb-2 text-xl'>Alphabet</p>
                <button className='block' type="button" onClick={handleAddAlphabet1}>Tambah Alphabet</button>
                <div className='my-2 flex gap-3'>
                  {automata1.alphabet.map(alphabet => (
                      <div className='rounded bg-green-900 w-fit p-3'>{alphabet}</div>
                  ))}
                </div>
              </div>

              <label className='block text-xl border py-2 pl-2'>
                <p className='mb-2'>Start State</p>
                <select className='block' value={automata1.start_state} onChange={handleStartStateChange1}>
                  <option value="">Pilih Start State</option>
                  {automata1.states.map(state => (
                      <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>

              <div className='border my-4 py-2 pl-2'>
                <p className='mb-2 text-xl'>Accepting State</p>
                <button className='block' type="button" onClick={handleAddAcceptingState1}>Tambah Accepting State
                </button>
                <div className='flex gap-3 mt-2'>
                  {automata1.accepting_states.map(state => (
                      <div className='rounded bg-green-900 w-fit p-3'>{state}</div>
                  ))}
                </div>
              </div>

              {automata1.type == "DFA" ? (
                  <div className='border my-4 py-2 pl-2'>
                    <p className='mb-2 text-xl'>Transition</p>
                    {Object.entries(automata1.states).map(([index, state_name]) =>
                        <div className={'flex gap-3 pl-2 mt-3'}>
                          <div key={index}>{state_name}</div>
                          {Object.entries(automata1.alphabet).map(([index, alphabetName]) => (
                              <div className='flex gap-1'>
                                <div key={index}>{alphabetName}</div>
                                <select className='block w-36' onChange={handleDFATransition1(state_name, alphabetName)}>
                                  <option key={index} value={""}></option>
                                  {automata1.states.map((alphabetName, index) => (
                                      <option key={index} value={alphabetName}>{alphabetName}</option>
                                  ))}
                                </select>
                              </div>
                          ))}

                        </div>
                    )}
                  </div>
              ) : (
                  <div className='border my-4 py-2 pl-2'>
                    <p className='mb-2 text-xl'>Transition</p>
                    <button className='block' type="button" onClick={handleAddTransition1}>Tambah Transition</button>
                    {Object.entries(automata1.transitions).map(([stateFrom, transitions]) => (
                        Object.entries(transitions).map(([alphabet, stateTo]) => (
                            <li key={`${stateFrom}-${alphabet}-${stateTo}`}>
                              State Asal: {stateFrom}, State Tujuan: {stateTo}, Alphabet: {alphabet}
                            </li>
                        ))
                    ))}
                  </div>
              )}


            </div>

          </div>
          <div className="w-full max-w-md">
            <div>
              <div className='my-4 border py-2 pl-2'>
                <p className='mb-2 text-xl'>State</p>
                <button className='block' type="button" onClick={handleAddState2}>Tambah State</button>
                <div className='my-2 flex gap-3'>
                  {automata2.states.map(state => (
                      <div className='rounded bg-green-900 w-fit p-3'>{state}</div>
                  ))}
                </div>
              </div>

              <div className='my-4 border py-2 pl-2'>
                <p className='mb-2 text-xl'>Alphabet</p>
                <button className='block' type="button" onClick={handleAddAlphabet2}>Tambah Alphabet</button>
                <div className='my-2 flex gap-3'>
                  {automata2.alphabet.map(alphabet => (
                      <div className='rounded bg-green-900 w-fit p-3'>{alphabet}</div>
                  ))}
                </div>
              </div>

              <label className='block text-xl border py-2 pl-2'>
                <p className='mb-2'>Start State</p>
                <select className='block' value={automata2.start_state} onChange={handleStartStateChange2}>
                  <option value="">Pilih Start State</option>
                  {automata2.states.map(state => (
                      <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>

              <div className='border my-4 py-2 pl-2'>
                <p className='mb-2 text-xl'>Accepting State</p>
                <button className='block' type="button" onClick={handleAddAcceptingState2}>Tambah Accepting State
                </button>
                <div className='flex gap-3 mt-2'>
                  {automata2.accepting_states.map(state => (
                      <div className='rounded bg-green-900 w-fit p-3'>{state}</div>
                  ))}
                </div>
              </div>

              {automata2.type == "DFA" ? (
                  <div className='border my-4 py-2 pl-2'>
                    <p className='mb-2 text-xl'>Transition</p>
                    {Object.entries(automata2.states).map(([index, state_name]) =>
                        <div className={'flex gap-3 pl-2 mt-3'}>
                          <div key={index}>{state_name}</div>
                          {Object.entries(automata2.alphabet).map(([index, alphabetName]) => (
                              <div className='flex gap-1'>
                                <div key={index}>{alphabetName}</div>
                                <select className='block w-36' onChange={handleDFATransition2(state_name, alphabetName)}>
                                  <option key={index} value={""}></option>
                                  {automata2.states.map((alphabetName, index) => (
                                      <option key={index} value={alphabetName}>{alphabetName}</option>
                                  ))}
                                </select>
                              </div>
                          ))}

                        </div>
                    )}
                  </div>
              ) : (
                  <div className='border my-4 py-2 pl-2'>
                    <p className='mb-2 text-xl'>Transition</p>
                    <button className='block' type="button" onClick={handleAddTransition2}>Tambah Transition</button>
                    {Object.entries(automata2.transitions).map(([stateFrom, transitions]) => (
                        Object.entries(transitions).map(([alphabet, stateTo]) => (
                            <li key={`${stateFrom}-${alphabet}-${stateTo}`}>
                              State Asal: {stateFrom}, State Tujuan: {stateTo}, Alphabet: {alphabet}
                            </li>
                        ))
                    ))}
                  </div>
              )}


            </div>

          </div>
          {/*<form onSubmit={handleSubmit} className="space-y-4 w-full">*/}
          {/*  <label className="block mb-2 w-full text-center">Input JSON 1:</label>*/}
          {/*  <textarea*/}
          {/*      ref={textareaRef1}*/}
          {/*      title="jsonInput1"*/}
          {/*      value={jsonInput1}*/}
          {/*      onChange={handleChange1}*/}
          {/*      className="w-full border-red-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"*/}
          {/*  />*/}
          {/*  <label className="block mb-2 w-full text-center">Input JSON 2:</label>*/}
          {/*  <textarea*/}
          {/*      ref={textareaRef2}*/}
          {/*      title="jsonInput2"*/}
          {/*      value={jsonInput2}*/}
          {/*      onChange={handleChange2}*/}
          {/*      className="w-full border-red-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"*/}
          {/*  />*/}
          {/*  <button*/}
          {/*      type="submit"*/}
          {/*      className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
          {/*  >*/}
          {/*    Submit*/}
          {/*  </button>*/}
          {/*</form>*/}


          {/*{jsonInput1 && (*/}
          {/*    <div>*/}
          {/*      <div className={'mb-8'}>*/}
          {/*        {jsonInput1}*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        {jsonInput2}*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*)}*/}

        </div>

        <div className='w-full flex justify-center m-4'>
          <button className='block' onClick={handleSubmit}>Submit</button>
        </div>

        <div className={'flex-col w-full m-4'}>
          <div className={'w-full block mb-8'}>
            {JSON.stringify(automata1)}
          </div>
          <div>
            {JSON.stringify(automata2)}
          </div>
        </div>

        <div className={'grid grid-cols-2'}>
          {svgResponse1 && (
              <div className="mt-8 w-full">
                <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
                <div className="flex justify-center items-center">
                  <div dangerouslySetInnerHTML={{__html: svgResponse1}}></div>
                </div>
              </div>
          )}
          {svgResponse2 && (
              <div className="mt-8 w-full">
                <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
                <div className="flex justify-center items-center">
                  <div dangerouslySetInnerHTML={{__html: svgResponse2}}></div>
                </div>
              </div>
          )}
        </div>

        {response && (
            <div className="mt-8 w-full">
              <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
              <div className="flex justify-center items-center">
                <div
                    className={`w-24 p-5 rounded-md text-center text-white font-bold ${response === 'True' ? 'bg-green-500' : 'bg-red-500'}`}>
                  <p>{response}</p>
                </div>
              </div>
            </div>
        )}

      </div>


  );
};

export default Nomor_4;
