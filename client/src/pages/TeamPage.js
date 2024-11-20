// src/pages/TeamPage.js
import React from 'react';
import TeamList from '../components/TeamList';  // Import de la liste des équipes
import { Typography, Box } from '@mui/material';

const TeamPage = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Liste des Équipes
        <TeamList />
      </Typography>
    </Box>
  );
};

export default TeamPage;
