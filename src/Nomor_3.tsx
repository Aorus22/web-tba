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

const Nomor_3: React.FC = () => {
  // const [jsonInput, setJsonInput] = useState<string>('');
  const [svgResponse1, setSvgResponse1] = useState<string>('');
  const [svgResponse2, setSvgResponse2] = useState<string>('');
  const [response1, setResponse1] = useState<string>('');
  const [response2, setResponse2] = useState<string>('');
  // const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [automata, setAutomata] = useState<Input_Automata>({
    "type": "DFA",
    "states": ["q0", "q1"],
    "alphabet": ["0", "1"],
    "transitions": {
      "q0": {"0": ["q0"], "1": ["q1"]},
      "q1": {"0": ["q0"], "1": ["q1"]}
    },
    "start_state": "q0",
    "accepting_states": ["q1"],
    "strings": "000201"
  });

  const handleChange = async () => {
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automata)
      };
      const res = await fetch('http://localhost:5000/draw_diagram', requestOptions);
      const data = await res.json();
      setSvgResponse1(data.svgResult);
      console.log(automata)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleChange()
  }, [automata]);



  // useEffect(() => {
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = 'auto';
  //     textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  //   }
  // }, [jsonInput]);

  // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setJsonInput(event.target.value);
  // };

  const handleSubmit = async () => {
    try {
      if (automata.type === 'DFA') {
        const hasEmptyTransition = Object.values(automata.transitions).some((transition: Record<string, string[]>) => {
          return Object.keys(transition).length === 0 || Object.values(transition).some((toStates: string[]) => toStates.length === 0);
        });

        if (Object.keys(automata.transitions).length === 0 || hasEmptyTransition) {
          alert('Harap isi semua transisi.');
          return;
        }
      }

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automata)
      };
      const res = await fetch('http://localhost:5000/nomor_3', requestOptions);
      const data = await res.json();
      setSvgResponse2(data.svgResult);
      setResponse1(data.result1)
      setResponse2(data.result2)

      console.log(response1)
      console.log(response2)
    } catch (error) {
      console.error('Error:', error);
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
        states: [...prevAutomata.states, newState]
      }));
      console.log(automata);
    }
  };

  const handleAddAlphabet = () => {
    const newAlphabet = prompt("Masukkan Alphabet baru:");
    if (newAlphabet) {
      setAutomata(prevAutomata => ({
        ...prevAutomata,
        alphabet: [...prevAutomata.alphabet, newAlphabet]
      }));
    }
  }

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


  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutomata(prevAutomata => ({
      ...prevAutomata,
      strings: e.target.value
    }));
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
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <div>
            <div className='my-4 border py-2 pl-2'>
              <p className='mb-2 text-xl'>State</p>
              <button className='block' type="button" onClick={handleAddState}>Tambah State</button>
              <div className='my-2 flex gap-3'>
                {automata.states.map(state => (
                    <div className='rounded bg-green-900 w-fit p-3'>{state}</div>
                ))}
              </div>
            </div>

            <div className='my-4 border py-2 pl-2'>
              <p className='mb-2 text-xl'>Alphabet</p>
              <button className='block' type="button" onClick={handleAddAlphabet}>Tambah Alphabet</button>
              <div className='my-2 flex gap-3'>
                {automata.alphabet.map(alphabet => (
                    <div className='rounded bg-green-900 w-fit p-3'>{alphabet}</div>
                ))}
              </div>
            </div>

            <label className='block text-xl border py-2 pl-2'>
              <p className='mb-2'>Start State</p>
              <select className='block' value={automata.start_state} onChange={handleStartStateChange}>
                <option value="">Pilih Start State</option>
                {automata.states.map(state => (
                    <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </label>

            <div className='border my-4 py-2 pl-2'>
              <p className='mb-2 text-xl'>Accepting State</p>
              <button className='block' type="button" onClick={handleAddAcceptingState}>Tambah Accepting State</button>
              <div className='flex gap-3 mt-2'>
                {automata.accepting_states.map(state => (
                    <div className='rounded bg-green-900 w-fit p-3'>{state}</div>
                ))}
              </div>
            </div>

            {automata.type == "DFA" ? (
                <div className='border my-4 py-2 pl-2'>
                  <p className='mb-2 text-xl'>Transition</p>
                  {Object.entries(automata.states).map(([index, state_name]) =>
                      <div className={'flex gap-3 pl-2 mt-3'}>
                        <div key={index}>{state_name}</div>
                        {Object.entries(automata.alphabet).map(([index, alphabetName]) => (
                            <div className='flex gap-1'>
                              <div key={index}>{alphabetName}</div>
                              <select className='block w-36' onChange={handleDFATransition(state_name, alphabetName)}>
                                <option key={index} value={""}></option>
                                {automata.states.map((alphabetName, index) => (
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
                  <button className='block' type="button" onClick={handleAddTransition}>Tambah Transition</button>
                  {Object.entries(automata.transitions).map(([stateFrom, transitions]) => (
                      Object.entries(transitions).map(([alphabet, stateTo]) => (
                          <li key={`${stateFrom}-${alphabet}-${stateTo}`}>
                            State Asal: {stateFrom}, State Tujuan: {stateTo}, Alphabet: {alphabet}
                          </li>
                      ))
                  ))}
                </div>
            )}


          </div>
          {/*<form onSubmit={handleSubmit} className="space-y-4 w-full">*/}
          {/*  <label className="block mb-2 w-full text-center">*/}
          {/*    Input JSON:*/}
          {/*  </label>*/}
          {/*  <textarea*/}
          {/*      ref={textareaRef}*/}
          {/*      title="jsonInput"*/}
          {/*      value={jsonInput}*/}
          {/*      onChange={handleChange}*/}
          {/*      className="w-full border-red-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"*/}
          {/*  />*/}
          {/*  <button*/}
          {/*      type="submit"*/}
          {/*      className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
          {/*  >*/}
          {/*    Submit*/}
          {/*  </button>*/}
          {/*</form>*/}

        </div>

        <div className="w-full max-w-md">

          <label className='block text-xl border py-2 pl-2 ml-4 w-full'>
            <p className='mb-2'>Test String</p>
            <input value={automata.strings} onChange={handleStringChange}/>
          </label>
          <div className={'m-4 flex gap-3'}>
            {JSON.stringify(automata)}
          </div>

          <div className='w-full flex justify-center m-4'>
            <button className='block' onClick={handleSubmit}>Submit</button>
          </div>
          <div className={'m-4 h-min-48 w-full pb-8'}>
            <div className="mt-8 w-full">
              <h2 className="text-center text-lg font-semibold mb-4">Diagram</h2>
              {svgResponse1 && (
                  <div className="flex justify-center items-center">
                    <div dangerouslySetInnerHTML={{__html: svgResponse1}}></div>
                  </div>
              )}
            </div>
          </div>
          <div className="mt-8 w-full m-4 h-48">
            <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
            <div className='flex justify-center items-center'>
              {response1 && (
                  <div
                      className={`w-24 p-5 rounded-md text-center text-white font-bold ${response1 === 'True' ? 'bg-green-500' : 'bg-red-500'}`}>
                    <p>{response1}</p>
                  </div>
              )}</div>

            {svgResponse2 && (
                <div className="mt-8 w-full">
                  <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
                  <div className="flex justify-center items-center">
                    <div dangerouslySetInnerHTML={{__html: svgResponse2}}></div>
                  </div>
                </div>
            )}
            {response2 && (
                <div className="mt-8 w-full">
                  <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
                  <div className='flex justify-center items-center'>
                    <div
                        className={`w-24 p-5 rounded-md text-center text-white font-bold ${response2 === 'True' ? 'bg-green-500' : 'bg-red-500'}`}>
                      <p>{response2}</p>
                    </div>
                  </div>
                </div>
            )}
          </div>
          {/*<form onSubmit={handleSubmit} className="space-y-4 w-full">*/}
          {/*    <label className="block mb-2 w-full text-center">*/}
          {/*      Input JSON:*/}
          {/*    </label>*/}
          {/*    <textarea*/}
          {/*        ref={textareaRef}*/}
          {/*        title="jsonInput"*/}
          {/*        value={jsonInput}*/}
          {/*        onChange={handleChange}*/}
          {/*        className="w-full border-red-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"*/}
          {/*    />*/}
          {/*    <button*/}
          {/*        type="submit"*/}
          {/*        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
          {/*    >*/}
          {/*      Submit*/}
          {/*    </button>*/}
          {/*  </form>*/}

        </div>
      </div>
  );
};

export default Nomor_3;
