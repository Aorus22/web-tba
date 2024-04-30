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

const Nomor_3: React.FC = () => {
  const [svgResponse1, setSvgResponse1] = useState<string>('');
  const [svgResponse2, setSvgResponse2] = useState<string>('');
  const [automata, setAutomata] = useState<Input_Automata>({
    type: "NFA",
    states: [],
    alphabet: [],
    transitions: {},
    start_state: "",
    accepting_states: [],
    strings: ""
  });

  useEffect(() => {
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

    handleChange()
  }, [automata]);


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
      const res = await fetch('http://localhost:5000/nomor_1', requestOptions);
      const data = await res.json();
      setSvgResponse1(data.result1);
      setSvgResponse2(data.result2);

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
      <div className={"items-center min-h-screen p-8"}>
        <p className={"text-4xl text-center mb-8"}>Konversi NFA / E-NFA ke DFA</p>
        <div className="grid grid-cols-2 justify-center px-24">
          <div className="w-full">
            <div className={'px-5'}>
              <FormComponent automata={automata} setAutomata={setAutomata} isUseinputType={false}/>
            </div>
          </div>


          <div className="w-full">
            {/*<div className={'m-4 flex gap-3'}>*/}
            {/*  {JSON.stringify(automata)}*/}
            {/*</div>*/}

            <div className='w-full flex justify-center pt-8'>
              <button className='block bg-indigo-600 hover:bg-indigo-700' onClick={handleSubmit}>Submit</button>
            </div>
            <div className={'h-min-48 w-full pb-8'}>
              <div className="mt-8 w-full">
                <h2 className="text-center text-lg font-semibold mb-4">Diagram</h2>
                {svgResponse1 && (
                    <div className="flex justify-center items-center">
                      <div dangerouslySetInnerHTML={{__html: svgResponse1}}></div>
                    </div>
                )}
              </div>
            </div>
            <div className="mt-8 w-full h-48">
              {svgResponse2 && (
                  <div className="mt-8 w-full">
                    <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
                    <div className="flex justify-center items-center">
                      <div dangerouslySetInnerHTML={{__html: svgResponse2}}></div>
                    </div>
                  </div>
              )}
            </div>

          </div>
        </div>
      </div>
  );
};

export default Nomor_3;
