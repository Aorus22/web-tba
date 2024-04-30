import React, { useState } from 'react';

const Nomor_2: React.FC = () => {
  const [regexInput, setRegexInput] = useState<string>('');
  const [svgResponse, setSvgResponse] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const test = tambahkanTitik(regexInput)
    console.log(test)
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regexp: test })
      };
      const res = await fetch('http://localhost:5000/nomor_2', requestOptions);
      const data = await res.json();
      setSvgResponse(data.svgResult);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const tambahkanTitik = (str: string): string => {
    let hasil = '';
    for (let i = 0; i < str.length; i++) {
        const currentChar = str[i];
        hasil += currentChar;
        if (i < str.length - 1) {
            const nextChar = str[i + 1];
            if ((/[0-9a-zA-Z)*]/).test(currentChar)) {
                if ((/[0-9a-zA-Z(]/).test(nextChar)) {
                    hasil += '.';
                }
            }
        }
    }
    return hasil;
  }

  return (
      <div className={"flex flex-col justify-center items-center min-h-screen"}>
        <h3 className={"text-4xl text-center mb-16"}>Konversi Regex ke E-NFA</h3>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <label className="block mb-2 w-full text-center">
                Input Regular Expression:
              </label>
              <input
                  title='Input Regex'
                  type="text"
                  value={regexInput}
                  onChange={handleChange}
                  className="w-full h-12 p-4 bg-gray-600 rounded-md shadow-sm"
              />
              <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
            <div className={"min-h-96"}>
              {svgResponse && (
                  <div className="mt-8 w-full">
                    <h2 className="text-center text-lg font-semibold mb-4">Hasil</h2>
                    <div className="flex justify-center items-center">
                      <div dangerouslySetInnerHTML={{__html: svgResponse}}></div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>


  );
};

export default Nomor_2;