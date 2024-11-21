// src/pages/MatchPage.js

import React from 'react';
import MatchList from '../components/MatchList'; 
import { Typography, Box } from '@mui/material';

const MatchPage = () => {
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Résumé des matchs passés
      </Typography>
      <MatchList />
    </Box>
  );
};

export default MatchPage;
