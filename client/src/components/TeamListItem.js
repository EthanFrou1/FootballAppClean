import React from "react";
import { ListItem, ListItemText } from "@mui/material";

// Affichage de chaque équipe dans la liste
function TeamListItem({ team }) {
  return (
    <ListItem key={team.id}>
      <ListItemText primary={team.name} secondary={team.city} />  {/* Utiliser team.name et team.city */}
    </ListItem>
  );
}

export default TeamListItem;
