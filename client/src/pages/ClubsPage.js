// src/pages/ClubsPage.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utilisation de useEffect pour appeler l'API lors du chargement du composant
  useEffect(() => {
    fetch('http://localhost:5070/api/club/club-with-teams') // Votre nouvel endpoint API
      .then((response) => response.json())
      .then((data) => {
        setClubs(data); // Enregistre les clubs et leurs équipes
        setLoading(false); // Fin du chargement
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des clubs:', error);
        setLoading(false); // Fin du chargement même en cas d'erreur
      });
  }, []); // Tableau de dépendances vide pour un appel une seule fois lors du rendu initial

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
        <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Liste des Clubs
            </Typography>
        </Box>
      <Grid container spacing={2}>
        {clubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{club.name}</Typography>
                <Typography variant="subtitle1">Ville : {club.city}</Typography>
                <Typography variant="body2">Code Postal : {club.codePostal}</Typography>
                
                {/* Affichage des équipes ou message si aucune équipe */}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Équipes :
                </Typography>
                {club.teams.length > 0 ? (
                  <ul>
                    {club.teams.map((team) => (
                      <li key={team.id}>{team.name}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Aucune équipe associée à ce club.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClubsPage;
