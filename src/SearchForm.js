import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import myConfig from './myConfig'; // Importa il file di configurazione

const SearchForm = () => {
  const [searchTerms, setSearchTerms] = useState(['']);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event, index) => {
    const updatedTerms = [...searchTerms];
    updatedTerms[index] = event.target.value;
    setSearchTerms(updatedTerms);
  };

  const handleAddTerm = () => {
    setSearchTerms([...searchTerms, '']);
  };

  const handleRemoveTerm = (index) => {
    const updatedTerms = searchTerms.filter((term, i) => i !== index);
    setSearchTerms(updatedTerms);
  };

  const handleReset = () => {
    setSearchTerms(['']);
    setSearchResults([]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(myConfig.apiSearchrUrl, {
      //const response = await fetch('http://127.0.0.1:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ terms: searchTerms }),
      });

      const data = await response.json();
      setSearchResults(data.message);
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginLeft: '16px' }}>
      <h2>Ricerca</h2>
      <Stack spacing={2}>
        {searchTerms.map((term, index) => (
          <div key={index} style={{ marginLeft: '16px' }}>
            <TextField
              label={`Termine di ricerca ${index + 1}`}
              variant="outlined"
              value={term}
              onChange={(event) => handleInputChange(event, index)}
            />
            <Button onClick={() => handleRemoveTerm(index)}>Rimuovi</Button>
            <br></br><br></br>
          </div>
        ))}
      </Stack>
      <Button variant="contained" onClick={handleAddTerm} style={{ marginLeft: '16px' }}>
        Aggiungi Termine
      </Button>
      <Button variant="contained" onClick={handleSubmit} style={{ marginLeft: '16px' }}>
        Cerca
      </Button>
      <Button variant="contained" onClick={handleReset} style={{ marginLeft: '16px' }}>
        Reset Ricerca
      </Button>

      {loading && <CircularProgress />}
      
      {searchResults.length > 0 && (
        <div>
          <h3>Risultati:</h3>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
