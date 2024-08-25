import React, { useState } from 'react';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);

      const res = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedJson.data, email: 'your-email@example.com' }),
      });

      const result = await res.json();
      setResponse(result);
      setShowDropdown(true);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
      setResponse(null);
      setShowDropdown(false);
    }
  };

  return (
    <div>
      <h1>Frontend Application</h1>
      <input
        type="text"
        placeholder='Enter JSON input'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showDropdown && (
        <div>
          <select multiple onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(option => option.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highestLowercaseAlphabet">Highest lowercase alphabet</option>
          </select>
          <button onClick={() => console.log(selectedOptions)}>Filter</button>
        </div>
      )}
      {response && (
        <div>
          <h2>Response:</h2>
          {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
          {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
          {selectedOptions.includes('highestLowercaseAlphabet') && response.highest_lowercase_alphabet.length > 0 && (
            <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet[0]}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
