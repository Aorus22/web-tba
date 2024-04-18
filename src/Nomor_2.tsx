import React, { useState } from 'react';

const Nomor_2: React.FC = () => {
  const [regexInput, setRegexInput] = useState<string>('');
  const [svgResponse, setSvgResponse] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regexp: regexInput })
      };
      const res = await fetch('http://localhost:5000/nomor_2', requestOptions);
      const data = await res.json();
      setSvgResponse(data.svgResult);
      console.log(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <label className="block mb-2 w-full text-center">
              Input Regular Expression:
            </label>
            <input
                type="text"
                value={regexInput}
                onChange={handleChange}
                className="w-full border-red-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
        </div>
      </div>
  );
};

export default Nomor_2;