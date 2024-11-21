import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, IconButton, Paper } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const AddMatchPage = () => {
  const [teams, setTeams] = useState([]);
  const [homeTeamId, setHomeTeamId] = useState('');
  const [awayTeamId, setAwayTeamId] = useState('');
  const [homePlayers, setHomePlayers] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [homeGoalsCount, setHomeGoalsCount] = useState(0);
  const [awayGoalsCount, setAwayGoalsCount] = useState(0);
  const [homeButeurs, setHomeButeurs] = useState([]);
  const [awayButeurs, setAwayButeurs] = useState([]);
  const [homeGoalsConfirmed, setHomeGoalsConfirmed] = useState(false);
  const [awayGoalsConfirmed, setAwayGoalsConfirmed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch('http://localhost:5070/api/team/with-players');
      const data = await response.json();
      setTeams(data);
    };
    fetchTeams();
  }, []);

  // Fetch players for selected team
  const fetchTeamPlayers = async (teamId, isHome) => {
    const response = await fetch(`http://localhost:5070/api/team/with-players?teamId=${teamId}`);
    const data = await response.json();
    if (isHome) {
      setHomePlayers(data[0]?.players || []);
    } else {
      setAwayPlayers(data[0]?.players || []);
    }
  };

  // Handle adding a goal
  const handleGoalCountChange = (team, action) => {
    if (action === 'add') {
      if (team === 'home') setHomeGoalsCount(homeGoalsCount + 1);
      if (team === 'away') setAwayGoalsCount(awayGoalsCount + 1);
    } else if (action === 'remove') {
      if (team === 'home' && homeGoalsCount > 0) setHomeGoalsCount(homeGoalsCount - 1);
      if (team === 'away' && awayGoalsCount > 0) setAwayGoalsCount(awayGoalsCount - 1);
    }
  };

  // Confirm goals for a team
  const confirmGoalsForTeam = (team) => {
    if (team === 'home') {
      setHomeGoalsConfirmed(true);
    } else if (team === 'away') {
      setAwayGoalsConfirmed(true);
    }
  };

  // Handle setting goals for players
  const handleButeurChange = (team, playerId, goals) => {
    if (team === 'home') {
      setHomeButeurs(prev => {
        const updatedButeurs = [...prev];
        const index = updatedButeurs.findIndex(buteur => buteur.playerId === playerId);
        if (index >= 0) {
          updatedButeurs[index] = { playerId, goals };
        } else {
          updatedButeurs.push({ playerId, goals });
        }
        return updatedButeurs;
      });
    } else if (team === 'away') {
      setAwayButeurs(prev => {
        const updatedButeurs = [...prev];
        const index = updatedButeurs.findIndex(buteur => buteur.playerId === playerId);
        if (index >= 0) {
          updatedButeurs[index] = { playerId, goals };
        } else {
          updatedButeurs.push({ playerId, goals });
        }
        return updatedButeurs;
      });
    }
  };

  // Proceed to the next step
  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5070/api/match', {
        method: 'POST',
        body: JSON.stringify({ homeButeurs, awayButeurs }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert("Match soumis avec succès !");
      } else {
        alert("Erreur lors de la soumission du match.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Ajouter un Match</Typography>

      {/* Etape 1: Choisir les équipes */}
      {currentStep === 1 && (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Choisissez vos équipes</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Équipe à domicile</InputLabel>
              <Select
                value={homeTeamId}
                onChange={(e) => {
                  setHomeTeamId(e.target.value);
                  fetchTeamPlayers(e.target.value, true);
                }}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Équipe à l'extérieur</InputLabel>
              <Select
                value={awayTeamId}
                onChange={(e) => {
                  setAwayTeamId(e.target.value);
                  fetchTeamPlayers(e.target.value, false);
                }}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setCurrentStep(currentStep - 1)} variant="outlined" color="error">
              Annuler
            </Button>
            <Button onClick={handleNextStep} variant="contained" color="primary" disabled={!homeTeamId || !awayTeamId}>
              Confirmer
            </Button>
          </Box>
        </Paper>
      )}

      {/* Etape 2: Nombre de buts */}
      {currentStep === 2 && (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">Nombre de buts</Typography>
          
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6">Équipe à domicile</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => handleGoalCountChange('home', 'add')} color="primary"><AddCircle /></IconButton>
              <Typography sx={{ display: 'inline', marginX: 2 }}>{homeGoalsCount}</Typography>
              <IconButton onClick={() => handleGoalCountChange('home', 'remove')} color="error"><RemoveCircle /></IconButton>
            </Box>
            {!homeGoalsConfirmed && (
              <Button onClick={() => confirmGoalsForTeam('home')} variant="contained" sx={{ marginTop: 2 }}>
                Confirmer
              </Button>
            )}
          </Box>

          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6">Équipe à l'extérieur</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => handleGoalCountChange('away', 'add')} color="primary"><AddCircle /></IconButton>
              <Typography sx={{ display: 'inline', marginX: 2 }}>{awayGoalsCount}</Typography>
              <IconButton onClick={() => handleGoalCountChange('away', 'remove')} color="error"><RemoveCircle /></IconButton>
            </Box>
            {!awayGoalsConfirmed && (
              <Button onClick={() => confirmGoalsForTeam('away')} variant="contained" sx={{ marginTop: 2 }}>
                Confirmer
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setCurrentStep(currentStep - 1)} variant="outlined" color="error">
              Annuler
            </Button>
            <Button onClick={handleNextStep} variant="contained" color="primary" disabled={!homeGoalsConfirmed || !awayGoalsConfirmed}>
              Confirmer
            </Button>
          </Box>
        </Paper>
      )}

      {/* Etape 3: Choisir les buteurs */}
      {currentStep === 3 && (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6">Choisir les buteurs</Typography>

          {/* Affichage des buteurs de la première équipe */}
          {homeGoalsCount > 0 && (
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h6">Équipe à domicile</Typography>
              {homePlayers.map(player => (
                <Box key={player.id} sx={{ marginBottom: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel>{player.firstName} {player.lastName}</InputLabel>
                    <Select
                      value={homeButeurs.find(buteur => buteur.playerId === player.id)?.goals || 0}
                      onChange={(e) => handleButeurChange('home', player.id, e.target.value)}
                    >
                      {[...Array(homeGoalsCount + 1).keys()].map(n => (
                        <MenuItem key={n} value={n}>{n}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ))}
            </Box>
          )}

          {/* Affichage des buteurs de la deuxième équipe */}
          {awayGoalsCount > 0 && (
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h6">Équipe à l'extérieur</Typography>
              {awayPlayers.map(player => (
                <Box key={player.id} sx={{ marginBottom: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel>{player.firstName} {player.lastName}</InputLabel>
                    <Select
                      value={awayButeurs.find(buteur => buteur.playerId === player.id)?.goals || 0}
                      onChange={(e) => handleButeurChange('away', player.id, e.target.value)}
                    >
                      {[...Array(awayGoalsCount + 1).keys()].map(n => (
                        <MenuItem key={n} value={n}>{n}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setCurrentStep(currentStep - 1)} variant="outlined" color="error">
              Annuler
            </Button>
            <Button onClick={handleNextStep} variant="contained" color="primary" disabled={homeButeurs.length < homeGoalsCount || awayButeurs.length < awayGoalsCount}>
              Confirmer
            </Button>
          </Box>
        </Paper>
      )}

      {/* Soumettre le formulaire */}
      {currentStep === 4 && (
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Soumettre le match
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddMatchPage;
