import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

function TeamList() {
  const [teams, setTeams] = useState([]); // Liste des équipes avec joueurs
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [showPlayers, setShowPlayers] = useState(null); // Gestion de l'affichage des joueurs
  const [loadingPlayers, setLoadingPlayers] = useState(null); // Gestion des chargements individuels

  useEffect(() => {
    const fetchTeamsWithPlayers = async () => {
      try {
          setLoading(true);
          const response = await fetch('http://localhost:5070/api/team/with-players');
          const data = await response.json();
  
          // Vérifie que `data` est un tableau
          if (Array.isArray(data)) {
              setTeams(data);
          } else {
              console.error("La réponse de l'API n'est pas un tableau :", data);
              setError("Données invalides reçues de l'API.");
          }
      } catch (err) {
          console.error('Erreur de chargement:', err);
          setError('Une erreur est survenue lors du chargement des données.');
      } finally {
          setLoading(false);
      }
  };
  

    fetchTeamsWithPlayers();
  }, []);

  const handleTogglePlayers = (teamId) => {
    if (showPlayers === teamId) {
      setShowPlayers(null);
    } else {
      setLoadingPlayers(teamId);
      setTimeout(() => {
        setShowPlayers(teamId);
        setLoadingPlayers(null);
      }, 500); // Simule une attente
    }
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
            {teams.map((team) => (
              <Grid item xs={12} sm={6} md={4} key={team.id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">{team.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{team.city}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleTogglePlayers(team.id)}
                      sx={{ mt: 2 }}
                    >
                      {loadingPlayers === team.id ? (
                        <CircularProgress size={20} />
                      ) : showPlayers === team.id ? 'Voir moins' : 'Voir les joueurs'}
                    </Button>
                    {showPlayers === team.id && (
                      <Box sx={{ mt: 2 }}>
                        {team.players.length > 0 ? (
                          <List>
                            {team.players.map((player) => (
                              <ListItem key={player.id}>
                                <ListItemAvatar>
                                  <Avatar>{player.firstName[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={`${player.firstName} ${player.lastName}`}
                                  secondary={player.position}
                                />
                              </ListItem>
                            ))}
                          </List>
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
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default TeamList;
