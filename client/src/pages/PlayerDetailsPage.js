import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid, Paper, Button, Divider } from '@mui/material';

const PlayerDetailsPage = () => {
  const { playerId, matchId } = useParams(); 
  const [playerStats, setPlayerStats] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchPlayerInfo();
    fetchPlayerStats();
  }, [playerId, matchId]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error" variant="h6">{error}</Typography>
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
  }

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" textAlign="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
        Détails du Joueur
      </Typography>

      {playerInfo && (
        <Typography variant="h5" textAlign="center" sx={{ fontWeight: 'bold', color: 'text.primary', marginBottom: 2 }}>
          {playerInfo.firstName} {playerInfo.lastName}
        </Typography>
      )}

      <Divider sx={{ marginBottom: 4 }} />

      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Statistiques du Match
            </Typography>

            <Box sx={{ marginBottom: 1 }}>
              <Typography display="flex" justifyContent="space-between">
                <span>Buts :</span>
                <span style={{ fontWeight: 'bold', color: playerStats.goals > 0 ? 'green' : 'text.secondary' }}>
                  {playerStats.goals ?? 'Non disponible'}
                </span>
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 1 }}>
              <Typography display="flex" justifyContent="space-between">
                <span>Passes :</span>
                <span style={{ fontWeight: 'bold', color: playerStats.assists > 0 ? 'blue' : 'text.secondary' }}>
                  {playerStats.assists ?? 'Non disponible'}
                </span>
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 1 }}>
              <Typography display="flex" justifyContent="space-between">
                <span>Cartons jaunes :</span>
                <span style={{ fontWeight: 'bold', color: playerStats.yellowCards > 0 ? 'orange' : 'text.secondary' }}>
                  {playerStats.yellowCards ?? 'Non disponible'}
                </span>
              </Typography>
            </Box>

            <Box sx={{ marginBottom: 1 }}>
              <Typography display="flex" justifyContent="space-between">
                <span>Cartons rouges :</span>
                <span style={{ fontWeight: 'bold', color: playerStats.redCards > 0 ? 'red' : 'text.secondary' }}>
                  {playerStats.redCards ?? 'Non disponible'}
                </span>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate(`/match/${matchId}`)}
        >
          Revenir au match
        </Button>
      </Box>
    </Box>
  );
};

export default PlayerDetailsPage;
