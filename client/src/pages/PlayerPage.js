// src/pages/PlayerPage.js
import React from 'react';
import PlayerForm from '../components/PlayerForm';  // Import du formulaire pour ajouter un joueur
import { Typography, Box } from '@mui/material';

const PlayerPage = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
    <Typography variant="h3" component="h1" gutterBottom>
    Ajouter un Joueur
      <PlayerForm />
    </Typography>
  </Box>
  );
};

export default PlayerPage;
