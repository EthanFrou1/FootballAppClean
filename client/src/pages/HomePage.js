// src/pages/HomePage.js
import React from 'react';
import { Typography, Box, Container } from '@mui/material';

function HomePage() {
  return (
    <Container>
      <Box sx={{ paddingTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenue sur FootballApp
        </Typography>
        <Typography variant="body1" paragraph>
          FootballApp est une plateforme où vous pouvez gérer vos équipes de football,
          consulter les clubs populaires, ajouter des joueurs et suivre vos équipes préférées.
        </Typography>
        <Typography variant="body1" paragraph>
          Grâce à notre interface, vous pouvez facilement créer de nouvelles équipes, 
          gérer vos joueurs, et explorer les clubs les plus prestigieux du monde entier.
        </Typography>
        <Typography variant="body1" paragraph>
          Naviguez à travers les différentes pages pour ajouter, consulter et suivre toutes les informations concernant vos équipes et clubs de football !
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;
