import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Paper, Button } from '@mui/material';

const PlayerDetailsPage = () => {
  const { playerId, matchId } = useParams(); // Récupère les IDs du joueur et du match
  const [playerStats, setPlayerStats] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null); // Nouveau state pour les informations du joueur
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook de navigation pour revenir à la page précédente

  useEffect(() => {
    // Récupérer les informations du joueur
    const fetchPlayerInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5070/api/player/${playerId}`);
        if (!response.ok) {
          throw new Error('Erreur de récupération des informations du joueur');
        }
        const data = await response.json();
        setPlayerInfo(data);
      } catch (err) {
        setError(err.message);
      }
    };

    // Récupérer les statistiques du joueur pour ce match spécifique
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(`http://localhost:5070/api/player/playerstats/${playerId}/${matchId}`);
        if (!response.ok) {
          throw new Error('Erreur de récupération des statistiques');
        }
        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Aucune statistique disponible pour ce joueur dans ce match');
        }
        setPlayerStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Appeler les deux fonctions de récupération de données
    fetchPlayerInfo();
    fetchPlayerStats();
  }, [playerId, matchId]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  if (error) return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography color="error">{error}</Typography>
      {/* Ajouter un bouton pour revenir à la page du match */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate(`/match/${matchId}`)} 
        sx={{ mt: 2 }}
      >
        Revenir au match
      </Button>
    </Box>
  );

  return (
    <Box sx={{ textAlign: 'center', mt: 4, px: 3 }}>
      
      {/* Affichage du nom du joueur */}
      {playerInfo ? (
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Statistiques pour {playerInfo.firstName} {playerInfo.lastName}
        </Typography>
      ) : (
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Statistiques pour ce joueur
        </Typography>
      )}

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          {/* Boîte contenant les statistiques du joueur */}
          <Paper elevation={6} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Statistiques pour ce match
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Buts :</Typography>
              <Typography color={playerStats.goals === null ? 'text.secondary' : 'primary'}>
                {playerStats.goals ?? 'Non disponible'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Passes :</Typography>
              <Typography color={playerStats.assists === null ? 'text.secondary' : 'primary'}>
                {playerStats.assists ?? 'Non disponible'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Cartons jaunes :</Typography>
              <Typography color={playerStats.yellowCards === null ? 'text.secondary' : 'primary'}>
                {playerStats.yellowCards ?? 'Non disponible'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Cartons rouges :</Typography>
              <Typography color={playerStats.redCards === null ? 'text.secondary' : 'primary'}>
                {playerStats.redCards ?? 'Non disponible'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Bouton pour revenir au match */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate(`/match/${matchId}`)} 
        sx={{ mt: 3 }}
      >
        Revenir au match
      </Button>
    </Box>
  );
};

export default PlayerDetailsPage;
