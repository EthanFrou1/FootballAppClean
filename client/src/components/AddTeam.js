// src/pages/AddTeamPage.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert, MenuItem } from '@mui/material';

const AddTeamPage = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [clubId, setClubId] = useState('');
  const [clubs, setClubs] = useState([]); // Liste des clubs
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Charger la liste des clubs depuis l'API
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:5070/api/club');
        const data = await response.json();
        setClubs(data); // Stocker les clubs dans l'état
      } catch (error) {
        console.error('Erreur lors du chargement des clubs:', error);
        setErrorMessage('Impossible de charger la liste des clubs.');
      }
    };

    fetchClubs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !city || !clubId) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5070/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, city, clubId: parseInt(clubId) }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Équipe ${data.name} ajoutée avec succès !`);
        setName('');
        setCity('');
        setClubId('');
      } else {
        const error = await response.text();
        setErrorMessage(`Erreur : ${error}`);
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de l’ajout.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom de l'équipe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Club"
          value={clubId}
          onChange={(e) => setClubId(e.target.value)}
          fullWidth
          margin="normal"
        >
          {clubs.map((club) => (
            <MenuItem key={club.id} value={club.id}>
              {club.name} ({club.city})
            </MenuItem>
          ))}
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Ajouter l'équipe
            </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTeamPage;
