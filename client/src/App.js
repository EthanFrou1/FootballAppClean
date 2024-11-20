// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import TeamPage from './pages/TeamPage'; // Import de la page des équipes
import PlayerPage from './pages/PlayerPage'; // Import de la page d'ajout d'un joueur

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
            {/* Logo ou Titre */}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              FootballApp
            </Typography>

            {/* Liens de navigation */}
            <Button color="inherit" component={Link} to="/">
              Équipes
            </Button>
            <Button color="inherit" component={Link} to="/ajouter-joueur">
              Ajouter un Joueur
            </Button>
          </Toolbar>
        </AppBar>

        {/* Contenu des pages */}
        <Box sx={{ padding: 2 }}>
          <Routes>
            <Route path="/" element={<TeamPage />} /> {/* Page des équipes */}
            <Route path="/ajouter-joueur" element={<PlayerPage />} /> {/* Page pour ajouter un joueur */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
