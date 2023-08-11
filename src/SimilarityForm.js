import React, { useState } from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import myConfig from './myConfig'; // Importa il file di configurazione

const SimilarityForm = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setShowResults(false);

    axios.get(myConfig.apiSimilarityrUrl)
      .then(response => {
        const message = response.data.message;
        setResults(message);
        setShowResults(true);
      })
      .catch(error => {
        console.error('Errore durante la richiesta API:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReset = () => {
    setResults([]);
    setShowResults(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleSearch}
        style={{ marginLeft: '16px', marginTop: '16px' }}
        disabled={loading}
      >
        Cerca CV simili
      </Button>

      <Button
        variant="outlined"
        onClick={handleReset}
        style={{ marginLeft: '16px', marginTop: '16px' }}
        disabled={loading || !showResults}
      >
        Reset
      </Button>

      {loading && <CircularProgress style={{ marginLeft: "16px" , marginTop: '16px' }} />}

      {showResults && (
        <div>
          <Typography variant="h6" style={{ marginLeft: "16px" , marginTop: '16px' }}>
            Lista CV simili:
          </Typography>
          
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SimilarityForm;
