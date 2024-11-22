    import React, { useState, useEffect } from 'react';
    import {
    Container,
    Typography,
    CircularProgress,
    Box,
    Grid,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton
    } from '@mui/material';
    import { useParams, useNavigate } from 'react-router-dom';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faUser, faTimes } from '@fortawesome/free-solid-svg-icons';

    function CompositionPage() {
    const { teamId, matchId } = useParams(); // Récupère l'ID de l'équipe et du match depuis l'URL
    const [players, setPlayers] = useState([]); // Liste des joueurs de l'équipe sélectionnée
    const [teamName, setTeamName] = useState(''); // Nom de l'équipe sélectionnée
    const [loading, setLoading] = useState(true); // Indicateur de chargement
    const [error, setError] = useState(null); // Erreur éventuelle
    const [selectedPlayer, setSelectedPlayer] = useState(null); // Joueur sélectionné
    const [positions, setPositions] = useState({}); // Positions des joueurs sur le terrain
    const [playerSelected, setPlayerSelected] = useState(false); // Indicateur si un joueur est sélectionné
    const navigate = useNavigate(); // Utilisation de navigate pour revenir à la page TeamMatches

    useEffect(() => {
        const fetchPlayers = async () => {
        try {
            // Modifier la requête pour inclure l'ID de l'équipe dans l'URL
            const response = await fetch(`http://localhost:5070/api/team/with-players?teamId=${teamId}`);
            if (!response.ok) {
            throw new Error('Impossible de charger la liste des joueurs.');
            }
            const data = await response.json();
            
            // Chercher l'équipe par ID
            const team = data.find(team => team.id === parseInt(teamId));
            
            if (team) {
            // Si l'équipe est trouvée, extraire la liste des joueurs et le nom de l'équipe
            setPlayers(team.players);
            setTeamName(team.name); // Sauvegarder le nom de l'équipe
            } else {
            setError('Équipe non trouvée.');
            }
        } catch (err) {
            setError(err.message || 'Une erreur est survenue.');
        } finally {
            setLoading(false); // Mettre à jour l'état de chargement
        }
        };

        fetchPlayers();
    }, [teamId]); // Recharger les joueurs chaque fois que l'ID de l'équipe change

    const handlePlayerChange = (event) => {
        const playerId = event.target.value;
        const player = players.find(p => p.id === parseInt(playerId));
        setSelectedPlayer(player); // Met à jour le joueur sélectionné
        setPlayerSelected(true); // Indique qu'un joueur a été sélectionné
    };

    // Fonction pour valider la composition
    const validateComposition = () => {
        // Vérifier si tous les postes sont affectés
        const requiredPositions = [
        'Goalkeeper', 'DefenderCentreLeft', 'DefenderCentreRight', 'DefenderRight', 
        'DefenderLeft', 'MidfielderCentreRight', 'MidfielderCentreLeft', 
        'MidfielderRight', 'MidfielderLeft', 'StrikerRight', 'StrikerLeft'
        ];

        // Vérifie si chaque poste a un joueur
        const allPositionsFilled = requiredPositions.every(position => positions[position]);
        return allPositionsFilled;
    };

    const positionLabels = {
        'Goalkeeper': 'Gardien',
        'DefenderCentreLeft': 'Défenseur Centre Gauche',
        'DefenderCentreRight': 'Défenseur Centre Droit',
        'DefenderRight': 'Défenseur Droit',
        'DefenderLeft': 'Défenseur Gauche',
        'MidfielderCentreRight': 'Milieu Centre Droit',
        'MidfielderCentreLeft': 'Milieu Centre Gauche',
        'MidfielderRight': 'Milieu Droit',
        'MidfielderLeft': 'Milieu Gauche',
        'StrikerRight': 'Attaquant Droit',
        'StrikerLeft': 'Attaquant Gauche'
      };
      

    const handleSubmitComposition = async () => {
        const composition = Object.entries(positions).map(([position, player]) => ({
        playerId: player.id,
        position
        }));

        try {
        const response = await fetch(`http://localhost:5070/api/composition/${matchId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ composition })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'enregistrement de la composition.');
        }

        alert('Composition enregistrée avec succès');
        navigate(`/team/matches`);
        } catch (err) {
        alert('Une erreur est survenue lors de l\'enregistrement de la composition');
        }
    };

    const handleFieldClick = (position) => {
        if (selectedPlayer) {
        setPositions(prev => ({
            ...prev,
            [position]: selectedPlayer // Assigner le joueur sélectionné à la position cliquée
        }));
        setPlayerSelected(false); // Désélectionner le joueur après affectation
        setSelectedPlayer(null); // Réinitialiser le joueur sélectionné
        }
    };

    const handleRemovePlayerFromPosition = (position) => {
        setPositions(prev => {
        const newPositions = { ...prev };
        const removedPlayer = newPositions[position];
        delete newPositions[position];

        // Réactiver la case à cocher du joueur retiré
        if (removedPlayer) {
            setPlayers(prevPlayers => {
              // Retirer le joueur de la liste
              const updatedPlayers = prevPlayers.filter(player => player.id !== removedPlayer.id);
              return [...updatedPlayers, removedPlayer]; // Ajoutez-le à la fin
            });
          }

        return newPositions;
        });
    };

    const isPlayerAssigned = (playerId) => {
        return Object.values(positions).some(player => player.id === playerId);
    };

    // Fonction pour revenir à la page TeamMatches
    const handleBackToTeamMatches = () => {
        navigate('/team/matches'); // Naviguer vers la page TeamMatches
    };

    return (
        <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
            {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
            </Box>
            ) : error ? (
            <Typography variant="body1" color="error" align="center">
                {error}
            </Typography>
            ) : (
            <>
                <Typography variant="h4" gutterBottom align="center">
                Liste des joueurs de l'équipe {teamName} pour le match {matchId}
                </Typography>

                {/* Grid pour disposer la liste des joueurs et le terrain */}
                <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
                {/* Liste des joueurs à droite */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Liste des joueurs
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {players.length > 0 ? (     
                            players.map((player) => (
                                <div
                                    key={player.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        borderBottom: '1px solid #ddd', // Barre grise entre les joueurs
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                                        <Typography variant="body1">
                                            {player.firstName} {player.lastName}
                                        </Typography>
                                    </div>

                                    {/* Affichage du poste du joueur, si celui-ci est assigné */}
                                    <Typography variant="body2" color="textSecondary" style={{ marginRight: '8px' }}>
                                        {player.position ? player.position : 'Non assigné'} {/* Correction ici */}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                        <FormControlLabel
                                            control={<Checkbox value={player.id} onChange={handlePlayerChange} disabled={isPlayerAssigned(player.id)} />}
                                            label=""
                                        />

                                        {isPlayerAssigned(player.id) && (
                                            <IconButton color="error" onClick={() => handleRemovePlayerFromPosition(player.id)}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </IconButton>
                                        )}
                                    </Box>
                                </div>
                            ))
                        ) : (
                            <Typography variant="body1" align="center">
                                Aucun joueur trouvé pour cette équipe.
                            </Typography>
                        )}
                    </div>
                </Grid>

                {/* Terrain à gauche */}
                <Grid item xs={12} md={6}>
                    {/* Terrain avec les repères */}
                    <Box item xs={12}>
                    <Typography variant="h6" gutterBottom>Choisissez votre position sur le terrain :</Typography>
                    <div
                        style={{
                        backgroundImage: 'url("/img/football_field.jpeg")',
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['Goalkeeper'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['Goalkeeper'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['DefenderCentreLeft'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                        {positions['DefenderCentreLeft'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['DefenderCentreRight'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['DefenderCentreRight'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['DefenderRight'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['DefenderRight'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['DefenderLeft'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['DefenderLeft'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['MidfielderCentreRight'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['MidfielderCentreRight'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['MidfielderCentreLeft'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['MidfielderCentreLeft'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['MidfielderRight'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['MidfielderRight'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['MidfielderLeft'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['MidfielderLeft'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['StrikerRight'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['StrikerRight'].firstName}
                        </Typography>
                        )}
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
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        {positions['StrikerLeft'] && (
                        <Typography variant="body2" style={{ position: 'absolute', top: '70%', color: 'white' }}>
                            {positions['StrikerLeft'].firstName}
                        </Typography>
                        )}
                        </div>
                    </div>
                    </Box>
                </Grid>
                </Grid>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitComposition}
                    disabled={!validateComposition()} // Désactive le bouton tant que tous les postes ne sont pas remplis
                >
                    Valider la composition
                </Button>
                </Box>

                {/* Bouton pour revenir à la page TeamMatches */}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleBackToTeamMatches}>
                    Revenir aux matchs de l'équipe
                </Button>
                </Box>
            </>
            )}
        </Box>
        </Container>
    );
    }

    export default CompositionPage;
