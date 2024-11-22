import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function TeamMatches() {
  const [teams, setTeams] = useState([]); // Liste des équipes
  const [selectedTeam, setSelectedTeam] = useState(''); // ID de l'équipe sélectionnée
  const [matches, setMatches] = useState([]); // Liste des matchs de l'équipe
  const [loading, setLoading] = useState(false); // État de chargement des matchs
  const [error, setError] = useState(null); // Erreurs potentielles
  const navigate = useNavigate();

  // Récupère toutes les équipes
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5070/api/team');
        if (!response.ok) {
          throw new Error('Impossible de charger les équipes.');
        }
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setError(err.message || 'Une erreur est survenue.');
      }
    };

    fetchTeams();
  }, []);

  // Récupère les matchs pour l'équipe sélectionnée
  useEffect(() => {
    if (selectedTeam) {
      const fetchMatches = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://localhost:5070/api/match/team/${selectedTeam}`);
          if (!response.ok) {
            throw new Error('Impossible de charger les matchs pour cette équipe.');
          }
          const data = await response.json();
          setMatches(data);
        } catch (err) {
          setError(err.message || 'Une erreur est survenue.');
        } finally {
          setLoading(false);
        }
      };

      fetchMatches();
    }
  }, [selectedTeam]);

  // Gestion de la sélection de l'équipe
  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    setMatches([]); // Réinitialiser les matchs lors d'un changement d'équipe
  };

  // Navigation vers la page de composition en incluant l'ID de l'équipe
  const handleCompositionClick = (matchId) => {
    // En incluant l'ID de l'équipe dans l'URL
    navigate(`/composition/${selectedTeam}/${matchId}`);
  };

  // Fonction pour vérifier si un match est passé
  const isMatchPassed = (matchDate) => {
    return new Date(matchDate) < new Date();
  };

  // Séparation des matchs passés et futurs
  const upcomingMatches = matches.filter((match) => !isMatchPassed(match.matchDate));
  const pastMatches = matches.filter((match) => isMatchPassed(match.matchDate));

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        {/* Liste déroulante pour choisir une équipe */}
         <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Équipe</InputLabel>
            <Select
              value={selectedTeam}
              onChange={handleTeamChange}
              label="Équipe"
            >
              <MenuItem value="">Sélectionner une équipe</MenuItem>
              {teams.length > 0 ? (
                teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Chargement des équipes...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Tableau des matchs */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error" align="center">
            {error}
          </Typography>
        ) : matches.length === 0 && selectedTeam ? (
          <Typography variant="body1" align="center">
            Aucun match trouvé pour cette équipe.
          </Typography>
        ) : (
          <>
            {/* Affichage des matchs futurs */}
            {upcomingMatches.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Matchs à venir</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Équipe à domicile</TableCell>
                      <TableCell>Équipe à l'extérieur</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingMatches.map((match) => (
                      <TableRow key={match.matchId}>
                        <TableCell>{new Date(match.matchDate).toLocaleString()}</TableCell>
                        <TableCell>{match.homeTeam.name}</TableCell>
                        <TableCell>{match.awayTeam.name}</TableCell>
                        <TableCell>
                          {match.homeTeamScore} - {match.awayTeamScore}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleCompositionClick(match.matchId)}
                          >
                            Faire la composition
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}

            {/* Affichage des matchs passés */}
            {pastMatches.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6">Matchs passés</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Équipe à domicile</TableCell>
                      <TableCell>Équipe à l'extérieur</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pastMatches.map((match) => (
                      <TableRow key={match.matchId}>
                        <TableCell>{new Date(match.matchDate).toLocaleString()}</TableCell>
                        <TableCell>{match.homeTeam.name}</TableCell>
                        <TableCell>{match.awayTeam.name}</TableCell>
                        <TableCell>
                          {match.homeTeamScore} - {match.awayTeamScore}
                        </TableCell>
                        <TableCell>
                          <Button variant="contained" color="secondary" disabled>
                            Match terminé
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default TeamMatches;
