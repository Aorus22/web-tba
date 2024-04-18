import React, { useState, useRef, useEffect } from 'react';

const Nomor_4: React.FC = () => {
  const [jsonInput1, setJsonInput1] = useState<string>('');
  const [jsonInput2, setJsonInput2] = useState<string>('');
  const [svgResponse, setSvgResponse] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const textareaRef1 = useRef<HTMLTextAreaElement>(null);
  const textareaRef2 = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight(textareaRef1);
    adjustTextareaHeight(textareaRef2);
  }, [jsonInput1, jsonInput2]);

  const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  const handleChange1 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput1(event.target.value);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput2(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const combinedInputs = {
        "dfa1" : JSON.parse(jsonInput1),
        "dfa2" : JSON.parse(jsonInput2)
      };

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedInputs)
      };

      const res = await fetch('http://localhost:5000/nomor_4', requestOptions);
      const data = await res.json();
      setSvgResponse(data.svgResult);
      setResponse(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen h-fit">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <label className="block mb-2 w-full text-center">Input JSON 1:</label>
            <textarea
                ref={textareaRef1}
                title="jsonInput1"
                value={jsonInput1}
                onChange={handleChange1}
                className="w-full border-red-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
            />
            <label className="block mb-2 w-full text-center">Input JSON 2:</label>
            <textarea
                ref={textareaRef2}
                title="jsonInput2"
                value={jsonInput2}
                onChange={handleChange2}
                className="w-full border-red-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
            />
            <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
          {svgResponse && (
              <div className="mt-8 w-full">
                <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
                <div className="flex justify-center items-center">
                  <div dangerouslySetInnerHTML={{ __html: svgResponse }}></div>
                </div>
              </div>
          )}
          {response && (
              <div className="mt-8 w-full">
                <h2 className="text-center text-lg font-semibold mb-4">Response from Server:</h2>
                <div className="flex justify-center items-center">
                  <div className={`w-24 p-5 rounded-md text-center text-white font-bold ${response === 'True' ? 'bg-green-500' : 'bg-red-500'}`}>
                    <p>{response}</p>
                  </div>
                </div>
              </div>
          )}
          {jsonInput1 && (
              <div>
                <div className={'mb-8'}>
                  {jsonInput1}
                </div>
                <div>
                  {jsonInput2}
                </div>
              </div>
          )}

        </div>
      </div>
  );
};

export default Nomor_4;
