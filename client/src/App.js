import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Icône pour l'onglet "Ajouter"
import ViewListIcon from '@mui/icons-material/ViewList'; // Icône pour l'onglet "Voir"
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'; // Icône pour les matchs
import TeamPage from './pages/TeamPage'; // Page des équipes
import AddPlayerPage from './pages/AddPlayerPage'; // Page pour ajouter un joueur
import ClubsPage from './pages/ClubsPage'; // Page pour afficher les clubs
import AddTeamPage from './pages/AddTeamPage'; // Page pour ajouter une équipe
import HomePage from './pages/HomePage'; // Page d'accueil
import MatchPage from './pages/MatchPage'; // Page des matchs
import MatchDetailsPage from './pages/MatchDetailsPage'; // Page de détails d'un match
import PlayerDetailsPage from './pages/PlayerDetailsPage'; // Page de détails d'un joueur
import AddMatchPage from './pages/AddMatchPage'; // Page pour ajouter un match
import TeamMatches from './components/TeamMatches';
import CompositionPage from './components/CompositionPage';

function App() {
  const [anchorElAdd, setAnchorElAdd] = useState(null); // Gestion du menu "Ajouter"
  const [anchorElView, setAnchorElView] = useState(null); // Gestion du menu "Voir"
  const [anchorElMatches, setAnchorElMatches] = useState(null); // Gestion du menu "Matches"

  // Fonction pour ouvrir le menu "Ajouter"
  const handleClickAdd = (event) => {
    setAnchorElAdd(event.currentTarget);
  };

  // Fonction pour fermer le menu "Ajouter"
  const handleCloseAdd = () => {
    setAnchorElAdd(null);
  };

  // Fonction pour ouvrir le menu "Voir"
  const handleClickView = (event) => {
    setAnchorElView(event.currentTarget);
  };

  // Fonction pour fermer le menu "Voir"
  const handleCloseView = () => {
    setAnchorElView(null);
  };

  // Fonction pour ouvrir le menu "Matches"
  const handleClickMatches = (event) => {
    setAnchorElMatches(event.currentTarget);
  };

  // Fonction pour fermer le menu "Matches"
  const handleCloseMatches = () => {
    setAnchorElMatches(null);
  };

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
            {/* Titre FootballApp avec un lien vers la page d'accueil */}
            <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              FootballApp
            </Typography>

            {/* Menu "Ajouter" */}
            <IconButton color="inherit" onClick={handleClickAdd}>
              <AddIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElAdd}
              open={Boolean(anchorElAdd)}
              onClose={handleCloseAdd}
            >
              <MenuItem component={Link} to="/ajouter-equipe" onClick={handleCloseAdd}>
                Ajouter une Équipe
              </MenuItem>
              <MenuItem component={Link} to="/ajouter-joueur" onClick={handleCloseAdd}>
                Ajouter un Joueur
              </MenuItem>
            </Menu>

            {/* Menu "Voir" */}
            <IconButton color="inherit" onClick={handleClickView}>
              <ViewListIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElView}
              open={Boolean(anchorElView)}
              onClose={handleCloseView}
            >
              <MenuItem component={Link} to="/clubs" onClick={handleCloseView}>
                Voir les Clubs
              </MenuItem>
              <MenuItem component={Link} to="/equipes" onClick={handleCloseView}>
                Voir les Équipes
              </MenuItem>
              <MenuItem component={Link} to={`/team/matches`} onClick={handleCloseView}>
                Agenda d'une Équipe
              </MenuItem>
            </Menu>

            {/* Menu "Matches" */}
            <IconButton color="inherit" onClick={handleClickMatches}>
              <SportsSoccerIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElMatches}
              open={Boolean(anchorElMatches)}
              onClose={handleCloseMatches}
            >
              <MenuItem component={Link} to="/match" onClick={handleCloseMatches}>
                Voir les matchs
              </MenuItem>
              <MenuItem component={Link} to="/ajouter-match" onClick={handleCloseMatches}>
                Ajouter un Match
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Routes */}
        <Box sx={{ padding: 2 }}>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Page d'accueil */}
            <Route path="/clubs" element={<ClubsPage />} /> {/* Page des clubs */}
            <Route path="/ajouter-equipe" element={<AddTeamPage />} /> {/* Page ajout équipe */}
            <Route path="/ajouter-joueur" element={<AddPlayerPage />} /> {/* Page ajout joueur */}
            <Route path="/equipes" element={<TeamPage />} /> {/* Page des équipes */}
            <Route path="/match" element={<MatchPage />} /> {/* Page des matchs */}
            <Route path="/match/:id" element={<MatchDetailsPage />} /> {/* Détails d'un match */}
            <Route path="/player/playerstats/:playerId/:matchId" element={<PlayerDetailsPage />} />
            <Route path="/ajouter-match" element={<AddMatchPage />} />
            <Route path="/team/matches" element={<TeamMatches />} />
            <Route path="/composition/:matchId/:teamId" element={<CompositionPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
