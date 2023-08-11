import React, { useState, useEffect } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Box, Button} from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import SearchForm from './SearchForm';
import SimilarityForm from './SimilarityForm';

const App = () => {
  const [user, setUser] = useState(null);

  const responseMessage = (result) => {
    const user = result.user;
    if (user.email.endsWith('@progettopa.it')) {
      setUser(user);
      console.log('Utente autenticato:', user);
      console.log('Email:', user.email);
    } else {
      console.log('Utente non autorizzato');
      alert('L\'utente non è autorizzato.');
    }
  };

  const logout = () => {
    firebase.auth().signOut().then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Box>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <img
              height="50px"
              src="/images/logoppa1.png"
              alt="PPA Logo"
            />
          </Typography>
        </Toolbar>
      </AppBar>
      {user ? (
        <Button variant="contained" onClick={logout} style={{ marginTop: '16px', marginLeft: '16px' }}>Logout</Button>
      ) : (
        
        <Button variant="contained" onClick={() => {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider).then(responseMessage);
        }} style={{ marginTop: '16px', marginLeft: '16px' }}>Login</Button>
      )}
      {user && user.email.endsWith('@progettopa.it') && (
        <div>
          <SearchForm />
          <SimilarityForm /> {/* Aggiungi il nuovo componente qui */}
        </div>
      )}
    </Box>
  );
};

export default App;
