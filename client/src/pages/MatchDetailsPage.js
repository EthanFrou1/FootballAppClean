import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Avatar,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const MatchDetailsPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchAndTeams = async () => {
      try {
        setLoading(true);

        const matchResponse = await fetch(`http://localhost:5070/api/match/${id}`);
        if (!matchResponse.ok) {
          throw new Error('Erreur lors de la récupération du match');
        }
        const matchData = await matchResponse.json();
        setMatch(matchData);

        const teamsResponse = await fetch(
          `http://localhost:5070/api/team/with-players?homeTeamId=${matchData.homeTeamId}&awayTeamId=${matchData.awayTeamId}&matchId=${matchData.id}`
        );

        if (!teamsResponse.ok) {
          throw new Error('Erreur lors de la récupération des équipes');
        }

        const teamsData = await teamsResponse.json();
        setTeams(teamsData);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchAndTeams();
  }, [id]);

  if (loading) return <CircularProgress sx={{ marginTop: 4 }} />;
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />
        <Typography color="error" variant="h6" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      </Box>
    );
  }

  const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR');

  const homeTeam = teams?.find((team) => team.id === match.homeTeamId);
  const awayTeam = teams?.find((team) => team.id === match.awayTeamId);

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" textAlign="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
        Détails du Match
      </Typography>

      {match && (
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 2,
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
            }}
          >
            <Box sx={{ textAlign: 'center', marginRight: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {homeTeam?.name || 'Équipe A'}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {match.homeTeamScore} - {match.awayTeamScore}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', marginLeft: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                {awayTeam?.name || 'Équipe B'}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ color: 'gray' }}>
            Date : {formatDate(match.matchDate)}
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TeamDetails team={homeTeam} title="Équipe à domicile" match={match} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TeamDetails team={awayTeam} title="Équipe à l'extérieur" match={match} />
        </Grid>
      </Grid>
    </Box>
  );
};

const TeamDetails = ({ team, title, match }) => (
  <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
    <Typography variant="h6" sx={{ marginBottom: 2 }}>
      {title}
    </Typography>
    {team ? (
      <>
        <Typography variant="body1">Nom : {team.name}</Typography>
        <Typography variant="body1">Ville : {team.city}</Typography>
        {team.players.length > 0 ? (
          <Box>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Joueurs :
            </Typography>
            <ul>
              {team.players.map((player) => (
                <li
                  key={player.id}
                  style={{
                    textDecoration: 'none',
                    padding: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  <Link
                    to={`/player/playerstats/${player.id}/${match.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'inherit',
                    }}
                  >
                    <Typography variant="body1">
                      {player.firstName} {player.lastName} ({player.position})
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {player.stats?.goals > 0 && (
                        <Typography
                          sx={{
                            marginRight: 2,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'green',
                          }}
                        >
                          ⚽ {player.stats.goals}
                        </Typography>
                      )}
                      {player.stats?.assists > 0 && (
                        <Typography
                          sx={{
                            marginRight: 2,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'blue',
                          }}
                        >
                          🅰 {player.stats.assists}
                        </Typography>
                      )}
                    </Box>
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        ) : (
          <Typography>Aucun joueur disponible</Typography>
        )}
      </>
    ) : (
      <Typography>Informations non disponibles</Typography>
    )}
  </Paper>
);

export default MatchDetailsPage;
