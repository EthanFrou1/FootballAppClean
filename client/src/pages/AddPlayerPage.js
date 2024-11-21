// src/pages/AddPlayerPage.js
import React from 'react';
import AddPlayer from '../components/AddPlayer';  // Import du formulaire pour ajouter un joueur
import { Typography, Box } from '@mui/material';

const AddPlayerPage = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Ajouter un Joueur
        <AddPlayer />
      </Typography>
    </Box>
  );
};

export default AddPlayerPage;
