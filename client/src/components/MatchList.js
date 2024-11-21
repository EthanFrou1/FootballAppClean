import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Box, Button, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';  // Icône de calendrier
import SportsScoreIcon from '@mui/icons-material/SportsScore';      // Icône de score

function MatchList() {
  const [matches, setMatches] = useState([]); // Liste des matchs
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Charger les matchs passés depuis l'API
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5070/api/match'); // L'API pour récupérer les matchs
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError('Une erreur est survenue lors du chargement des matchs.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Fonction pour formater la date au format français
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
    return formattedDate;
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
            {matches.map((match) => (
              <Grid item xs={12} sm={6} md={4} key={match.id}>
                <Card 
                  sx={{ 
                    minWidth: 275, 
                    boxShadow: 3, 
                    transition: 'transform 0.2s', 
                    '&:hover': { transform: 'scale(1.05)' },
                    borderRadius: 2 
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {match.homeTeam.name} <span style={{ margin: '0 10px' }}>vs</span> {match.awayTeam.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                      <IconButton color="primary">
                        <CalendarTodayIcon />
                      </IconButton>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                        {formatDate(match.matchDate)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                      <IconButton color="secondary">
                        <SportsScoreIcon />
                      </IconButton>
                      <Typography variant="body2" color="text.primary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {match.homeTeamScore} - {match.awayTeamScore}
                      </Typography>
                    </Box>

                    <Button 
                      component={Link} 
                      to={`/match/${match.id}`} 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      sx={{ marginTop: 2 }}
                    >
                      Voir les détails
                    </Button>
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

export default MatchList;
