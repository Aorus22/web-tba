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
      <div className={"items-center min-h-screen p-8"}>
        <p className={"text-4xl text-center"}>Test String pada DFA, NFA, E-NFA, dan Regex</p>

        <div className="grid grid-cols-2 justify-center pt-8 px-24">
          <div className="w-full">
            <div className={'px-5'}>
              <FormComponent automata={automata} setAutomata={setAutomata} isUseinputType={true}/>
            </div>
          </div>


          <div className="w-full">
            <div className='rounded bg-gray-950 bg-opacity-50 text-xl my-4 py-2 pl-2 ml-4'>
              <p className='text-xl mb-1 font-bold'>Test String</p>
              <hr className='mb-4 w-36'/>
              <input title='Input String'  className="h-12 p-4 bg-gray-600 rounded" value={automata.strings} onChange={handleStringChange}/>
            </div>
            {/*<div className={'m-4 flex gap-3'}>*/}
            {/*  {JSON.stringify(automata)}*/}
            {/*</div>*/}

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
            {response && (
                <div className="mt-8 w-full m-4 h-48">
                  <h2 className="text-center text-lg font-semibold mb-4">Hasil:</h2>
                  <div className='flex justify-center items-center'>
                    <div
                        className={`w-24 p-5 rounded-md text-center text-white font-bold ${response === 'True' ? 'bg-green-500' : 'bg-red-500'}`}>
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
