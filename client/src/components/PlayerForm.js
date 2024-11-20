import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Container, Box, Typography, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function PlayerForm() {
  const [teams, setTeams] = useState([]); // Liste des équipes
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    DateOfBirth: '',
    position: '',
    teamId: ''
  });
  const [formError, setFormError] = useState(''); // État pour gérer les erreurs
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5070/api/team') // Remplace par l'URL de ton API
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Erreur de récupération des équipes:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation : Vérifier si un poste est sélectionné
    if (!formData.position) {
        setFormError('Veuillez sélectionner un poste sur le terrain.');
        return;
    }

    const playerData = {
      ...formData,
    };

    fetch('http://localhost:5070/api/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Joueur ajouté:', data); 
        // Réinitialiser le formulaire
        setFormData({
        lastName: '',
        firstName: '',
        DateOfBirth: '',
        position: '',
        teamId: '',
        });

        // Ouvrir la modale de succès
        setSuccessModalOpen(true);
        setFormError(''); // Réinitialiser l'erreur après le succès
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du joueur:', error);
        setFormError('Une erreur est survenue. Veuillez réessayer.');
      });
      
  };

  // Fonction pour définir la couleur de l'icône en fonction de la position sélectionnée
  const getIconColor = (currentPosition) => {
    if (formData.position === currentPosition) {
      switch (currentPosition) {
        case 'Goalkeeper':
          return 'blue';
        case 'DefenderLeft':
          return 'green';
        case 'DefenderCentreRight':
          return 'green';
        case 'DefenderCentreLeft':
          return 'green';
        case 'DefenderRight':
          return 'green';
        case 'MidfielderLeft':
          return 'yellow';
        case 'MidfielderCentreLeft':
          return 'yellow';
        case 'MidfielderCentreRight':
            return 'yellow';
        case 'MidfielderRight':
          return 'yellow';
        case 'StrikerLeft':
          return 'red';
        case 'StrikerCentre':
          return 'red';
        case 'StrikerRight':
          return 'red';
        default:
          return 'white';
      }
    }
    return 'white'; // Couleur par défaut pour les icônes non sélectionnées
  };
  

  const handleFieldClick = (position) => {
    setFormData((prevData) => ({
      ...prevData,
      position: position,
    }));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Prénom"
                variant="outlined"
                fullWidth
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date de naissance"
                type="date"
                variant="outlined"
                fullWidth
                value={formData.DateOfBirth}
                onChange={(e) => setFormData({ ...formData, DateOfBirth: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            {/* Terrain avec les repères */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Choisissez votre position sur le terrain :</Typography>
              <div
                style={{
                  backgroundImage: 'url("./img/football_field.jpeg")',
                  backgroundSize: 'cover',
                  width: '550px',
                  height: '365px',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* Repère Gardien */}
                <div
                  onClick={() => handleFieldClick('Goalkeeper')}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('Goalkeeper')} />
                </div>
                {/* Repère Défenseur */}
                <div
                  onClick={() => handleFieldClick('DefenderCentreLeft')}
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '28%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('DefenderCentreLeft')} />
                  </div>
                {/* Repère Défenseur */}
                <div
                  onClick={() => handleFieldClick('DefenderCentreRight')}
                  style={{
                    position: 'absolute',
                    top: '60%',
                    left: '28%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('DefenderCentreRight')} />
                  </div>
                {/* Repère Défenseur */}
                <div
                  onClick={() => handleFieldClick('DefenderRight')}
                  style={{
                    position: 'absolute',
                    top: '75%',
                    left: '35%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('DefenderRight')} />
                  </div>
                {/* Repère Défenseur */}
                <div
                  onClick={() => handleFieldClick('DefenderLeft')}
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '35%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('DefenderLeft')} />
                </div>
                {/* Repère Milieu */}
                <div
                  onClick={() => handleFieldClick('MidfielderCentreRight')}
                  style={{
                    position: 'absolute',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('MidfielderCentreRight')} />
                </div>
                {/* Repère Milieu */}
                <div
                  onClick={() => handleFieldClick('MidfielderCentreLeft')}
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('MidfielderCentreLeft')} />
                </div>
                {/* Repère Milieu */}
                <div
                  onClick={() => handleFieldClick('MidfielderRight')}
                  style={{
                    position: 'absolute',
                    top: '75%',
                    left: '60%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('MidfielderRight')} />
                </div>
                {/* Repère Milieu */}
                <div
                  onClick={() => handleFieldClick('MidfielderLeft')}
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '60%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('MidfielderLeft')} />
                </div>
                {/* Repère Attaquant */}
                <div
                  onClick={() => handleFieldClick('StrikerRight')}
                  style={{
                    position: 'absolute',
                    top: '60%',
                    left: '75%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('StrikerRight')} />
                </div>
                {/* Repère Attaquant */}
                <div
                  onClick={() => handleFieldClick('StrikerLeft')}
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '75%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} size="1x" color={getIconColor('StrikerLeft')} />
                </div>
              </div>

               {/* Affichage de l'erreur si aucun poste n'est sélectionné */}
                {formError && (
                    <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
                    {formError}
                    </Typography>
                )}
            </Grid>

            {/* Affichage de la position choisie */}
            <Grid item xs={12}>
              <Typography variant="body1">Position sélectionnée : {formData.position || 'Aucune'}</Typography>
            </Grid>

            {/* Sélection de l'équipe */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Équipe</InputLabel>
                <Select
                  value={formData.teamId}
                  onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
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

            {/* Bouton pour soumettre */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Ajouter le joueur
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Modale de succès */}
      <Dialog open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <DialogTitle>
          <FontAwesomeIcon icon={faCheckCircle} size="lg" color="green" /> Succès
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Le joueur a été ajouté avec succès à votre équipe.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessModalOpen(false)} color="primary" autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default PlayerForm;
