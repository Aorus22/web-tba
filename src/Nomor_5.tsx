import React, {useEffect, useState} from 'react';
import FormComponent, {Input_Automata} from "./FormComponent.tsx";

const Nomor_5: React.FC = () => {
  const [svgResponse, setSvgResponse] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [automata, setAutomata] = useState<Input_Automata>({
    type: "",
    states: [],
    alphabet: [],
    transitions: {},
    start_state: "",
    accepting_states: [],
    strings: ""
  });

  useEffect(() => {
    handleChange(automata)
  }, [automata]);

  const handleChange = async (automata: Input_Automata) => {
    if(automata.type == "REGEX"){
      setSvgResponse("")
      setResponse("")
      return
    }
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automata)
      };
      const res = await fetch('http://localhost:5000/draw_diagram', requestOptions);
      const data = await res.json();
      setSvgResponse(data.svgResult);
      setResponse("")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function replacePlusAndRemoveDots(inputString: string) {
    const withoutDots = inputString.replace(/\./g, '');
    return withoutDots.replace(/\+/g, '|');
  }

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

      if (automata.type === 'REGEX'){
        automata.start_state = replacePlusAndRemoveDots(automata.start_state)
      }

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(automata)
      };
      const res = await fetch('http://localhost:5000/nomor_5', requestOptions);
      const data = await res.json();
      setSvgResponse(data.svgResult);
      console.log(data.result);
      setResponse(data.result)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutomata(prevAutomata => ({
      ...prevAutomata,
      strings: e.target.value
    }));
  };

  return (
      <div className="container mx-auto p-8">
        <h3 className="text-4xl text-center">Test String pada DFA, NFA, E-NFA, dan Regex</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center pt-8">
          <div>
            <div className="px-5">
              <FormComponent automata={automata} setAutomata={setAutomata} isUseinputType={true}/>
            </div>
          </div>

          <div>
            <div className="rounded bg-gray-950 bg-opacity-50 text-xl my-4 py-4 px-6">
              <p className="text-xl mb-1 font-bold">Test String</p>
              <hr className='mb-4 w-36'/>
              <input title="Input String" className="w-full h-12 p-4 bg-gray-600 rounded box-border"
                     value={automata.strings} onChange={handleStringChange}/>
            </div>

            <div className="flex justify-center">
              <button
                  className="block w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}>Submit
              </button>
            </div>

            <div className="mt-8">
              {svgResponse && (
                  <div>
                    <h2 className="text-center text-lg font-semibold mb-4">Diagram</h2>
                    <div className="flex justify-center">
                      <div dangerouslySetInnerHTML={{__html: svgResponse}}></div>
                    </div>
                  </div>
              )}
            </div>

            {response && (
                <div className="mt-8">
                  <h2 className="text-center text-lg font-semibold mb-4">Hasil:</h2>
                  <div className="flex justify-center">
                    <div
                        className={`w-24 p-5 rounded-md text-center font-bold ${response === 'True' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      <p>{response}</p>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Nomor_5;
