import React, { useState, useEffect } from 'react';
import FormComponent from "./FormComponent.tsx";

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
  const [svgResponse1, setSvgResponse1] = useState<string>('');
  const [svgResponse2, setSvgResponse2] = useState<string>('');
  const [response, setResponse] = useState<string>('');

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

  const handleChange = async (automata: Input_Automata, SvgResponse: React.Dispatch<React.SetStateAction<string>>) => {
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automata)
      };
      const res = await fetch('http://localhost:5000/draw_diagram', requestOptions);
      const data = await res.json();
      SvgResponse(data.svgResult);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleChange(automata1, setSvgResponse1)
    handleChange(automata2, setSvgResponse2)
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
      <div className={"items-center min-h-screen p-8 pb-24"}>
        <h3 className={"text-4xl text-center"}>Ekuivalensi 2 DFA</h3>

        <div className="grid grid-cols-2 justify-center pt-8 px-24">
          <div className="w-full">
            <div className={'px-5'}>
              <FormComponent automata={automata1} setAutomata={setAutomata1} isUseinputType={false}/>
            </div>
          </div>

          <div className="w-full">
            <div className={'px-5'}>
              <FormComponent automata={automata2} setAutomata={setAutomata2} isUseinputType={false}/>
            </div>
          </div>

        </div>

        <div className='w-full flex justify-center mt-10'>
          <button className='block bg-indigo-600 hover:bg-indigo-700' onClick={handleSubmit}>Submit</button>
        </div>

        {/*<div className={'flex-col w-full m-4'}>*/}
        {/*  <div className={'w-full block mb-8'}>*/}
        {/*    {JSON.stringify(automata1)}*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    {JSON.stringify(automata2)}*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className={'grid grid-cols-2 px-24'}>
          {svgResponse1 && (
              <div className="mt-8 w-full">
                <h2 className="text-center text-lg font-semibold mb-4">Diagram</h2>
                <div className="flex justify-center items-center">
                  <div dangerouslySetInnerHTML={{__html: svgResponse1}}></div>
                </div>
              </div>
          )}
          {svgResponse2 && (
              <div className="mt-8 w-full">
                <h2 className="text-center text-lg font-semibold mb-4">Diagram</h2>
                <div className="flex justify-center items-center">
                  <div dangerouslySetInnerHTML={{__html: svgResponse2}}></div>
                </div>
              </div>
          )}
        </div>

        {response && (
            <div className="mt-8 w-full">
              <h2 className="text-center text-lg font-semibold mb-4">Hasil</h2>
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
