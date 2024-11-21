import React from 'react';
import TeamList from '../components/TeamList'; 
import { Typography, Box } from '@mui/material';

const TeamPage = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des Équipes
      </Typography>
      <TeamList />
    </Box>
  );
};

export default TeamPage;
