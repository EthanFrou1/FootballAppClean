import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Alert } from "@mui/material";

function AddTeamDialog({ open, onClose, onAddTeam, clubs }) {
  const [teamName, setTeamName] = useState("");
  const [teamCity, setTeamCity] = useState(""); // Champ ville sous forme d'input texte
  const [teamPostalCode, setTeamPostalCode] = useState(""); // Code postal
  const [teamClubId, setTeamClubId] = useState(""); // Club sélectionné par l'utilisateur
  const [error, setError] = useState(""); // Pour les erreurs

  const handleSubmit = () => {
    // Validation des champs
    if (!teamName || !teamCity || !teamPostalCode || !teamClubId) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
  
    // Convertir l'ID du club en nombre entier
    const clubIdAsNumber = parseInt(teamClubId, 10); // Assure-toi que l'ID du club est un entier
  
    // Vérifier que l'ID du club est bien un nombre
    if (isNaN(clubIdAsNumber)) {
      setError("L'ID du club sélectionné est invalide.");
      return;
    }
  
    // Construire l'objet de la nouvelle équipe avec uniquement le clubId
    const newTeam = { 
      name: teamName, 
      city: teamCity, 
      postalCode: teamPostalCode,
      clubId: clubIdAsNumber // Associer l'équipe à un club avec un ID valide
    };
  
    // Appeler la fonction parent pour ajouter l'équipe
    onAddTeam(newTeam);
    setError(""); // Réinitialiser les erreurs
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter une équipe</DialogTitle>
      <DialogContent>
        {/* Nom de l'équipe */}
        <TextField
          label="Nom de l'équipe"
          fullWidth
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          margin="normal"
        />
        
        {/* Sélectionner un club */}
        <TextField
          select
          fullWidth
          value={teamClubId}
          onChange={(e) => setTeamClubId(e.target.value)}
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Sélectionnez un club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name} ({club.city})
            </option>
          ))}
        </TextField>

        {/* Champ de ville (input texte) */}
        <TextField
          label="Ville"
          fullWidth
          value={teamCity}
          onChange={(e) => setTeamCity(e.target.value)}
          margin="normal"
        />

        {/* Champ pour saisir le code postal */}
        <TextField
          label="Code Postal"
          fullWidth
          value={teamPostalCode}
          onChange={(e) => setTeamPostalCode(e.target.value)}
          margin="normal"
        />

        {/* Afficher un message d'erreur si un champ est manquant */}
        {error && <Alert severity="error" style={{ marginTop: "10px" }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTeamDialog;
