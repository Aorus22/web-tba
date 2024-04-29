import React, { useState, useRef, useEffect } from 'react';

const Nomor_1: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [svgResponse1, setSvgResponse1] = useState<string>('');
  const [svgResponse2, setSvgResponse2] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [jsonInput]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonInput
      };
      const res = await fetch('http://localhost:5000/nomor_1', requestOptions);
      const data = await res.json();
      // console.log(data);
      setSvgResponse1(data.result1);
      setSvgResponse2(data.result2);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <label className="block mb-2 w-full text-center">
              Input JSON:
            </label>
            <textarea
                ref={textareaRef}
                title="jsonInput"
                value={jsonInput}
                onChange={handleChange}
                className="w-full border-red-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
            />
            <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>
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
      </div>
  );
};

export default Nomor_1;
