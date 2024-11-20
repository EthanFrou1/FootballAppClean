import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';

function TeamList() {
  const [teams, setTeams] = useState([]); // Liste des équipes
  const [players, setPlayers] = useState([]); // Liste des joueurs
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [showPlayers, setShowPlayers] = useState(null); // Gestion de l'affichage des joueurs

  useEffect(() => {
    // Charger les équipes et les joueurs dès le chargement du composant
    const fetchTeamsAndPlayers = async () => {
      try {
        setLoading(true);

        // Charger les équipes
        const teamResponse = await fetch('http://localhost:5070/api/team'); // Remplace avec ton URL d'API pour les équipes
        const teamData = await teamResponse.json();
        setTeams(teamData);

        // Charger tous les joueurs
        const playerResponse = await fetch('http://localhost:5070/api/player'); // Remplace avec ton URL d'API pour les joueurs
        const playerData = await playerResponse.json();
        setPlayers(playerData);

        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError('Une erreur est survenue lors du chargement des données.');
        setLoading(false);
      }
    };

    fetchTeamsAndPlayers();
  }, []);

  const handleTogglePlayers = (teamId) => {
    setShowPlayers(showPlayers === teamId ? null : teamId); // Basculer l'affichage des joueurs
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {teams.length > 0 ? (
              teams.map((team) => (
                <Grid item xs={12} sm={6} md={4} key={team.id}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {team.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {team.city}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleTogglePlayers(team.id)}
                        sx={{ mt: 2 }}
                      >
                        {showPlayers === team.id ? 'Voir moins' : 'Voir les joueurs'}
                      </Button>

                      {showPlayers === team.id && (
                        <Box sx={{ mt: 2 }}>
                          {players.filter((player) => player.teamId === team.id).length > 0 ? (
                            players
                              .filter((player) => player.teamId === team.id)
                              .map((player) => (
                                <Typography key={player.id} variant="body2">
                                  {player.firstName} {player.lastName} - {player.position}
                                </Typography>
                              ))
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              Aucun joueur trouvé.
                            </Typography>
                          )}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary" align="center">
                Aucune équipe trouvée.
              </Typography>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default TeamList;
