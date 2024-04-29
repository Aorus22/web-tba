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
    const handleChange = async () => {
      try {
        const requestOptions: RequestInit = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(automata)
        };
        const res = await fetch('http://localhost:5000/draw_diagram', requestOptions);
        const data = await res.json();
        setSvgResponse(data.svgResult);
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
      <div className="flex justify-center items-center min-h-screen">

        <div className="w-full max-w-md">
          <FormComponent automata={automata} setAutomata={setAutomata} isUseinputType={true}/>
        </div>

        <div className="w-full max-w-md">
          {/*<div className='rounded-md bg-gray-950 bg-opacity-50 my-4 py-2 pl-2'>*/}

          <div className='block rounded, bg-gray-950 bg-opacity-50 text-xl py-2 pl-2 ml-4 w-full'>
            <p className='text-xl mb-1 font-bold'>Test String</p>
            <hr className='mb-4 w-36' />
            <input className="h-12 p-4 bg-gray-600 rounded" value={automata.strings} onChange={handleStringChange}/>
          </div>
          <div className={'m-4 flex gap-3'}>
            {JSON.stringify(automata)}
          </div>

          <div className='w-full flex justify-center m-4'>
            <button className='block' onClick={handleSubmit}>Submit</button>
          </div>
          <div className={'m-4 h-min-48 w-full pb-8'}>
            <div className="mt-8 w-full">
            <h2 className="text-center text-lg font-semibold mb-4">Diagram</h2>
              {svgResponse && (
                  <div className="flex justify-center items-center">
                    <div dangerouslySetInnerHTML={{__html: svgResponse}}></div>
                  </div>
              )}
            </div>
          </div>
          <div className="mt-8 w-full m-4 h-48">
            <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
            <div className='flex justify-center items-center'>
              {response && (
                  <div
                      className={`w-24 p-5 rounded-md text-center text-white font-bold ${response === 'True' ? 'bg-green-500' : 'bg-red-500'}`}>
                    <p>{response}</p>
                  </div>
              )}</div>
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

export default Nomor_5;
