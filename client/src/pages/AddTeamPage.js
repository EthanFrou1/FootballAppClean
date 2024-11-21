import React from 'react';
import AddTeam from '../components/AddTeam'; 
import { Typography, Box } from '@mui/material';

const AddTeamPage = () => {
  return (
     <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            Ajouter une Équipe
        </Typography>
        <AddTeam />
    </Box>
  );
};

export default AddTeamPage;
