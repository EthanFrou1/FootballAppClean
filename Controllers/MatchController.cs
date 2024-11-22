using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballApp.Models; // Importer le namespace pour vos modèles
using System.Linq;
using System.Threading.Tasks;

namespace FootballApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly FootballContext _context;

        // Constructeur pour injecter le contexte de la base de données
        public MatchController(FootballContext context)
        {
            _context = context;
        }

        // Endpoint pour ajouter un match
        [HttpPost]
        public async Task<IActionResult> AddMatch([FromBody] Matches newMatch)
        {
            if (newMatch == null)
            {
                return BadRequest("Les données du match sont invalides.");
            }

            var homeTeam = await _context.Teams.FindAsync(newMatch.HomeTeamId);
            var awayTeam = await _context.Teams.FindAsync(newMatch.AwayTeamId);

            if (homeTeam == null || awayTeam == null)
            {
                return NotFound("L'une des équipes spécifiées n'existe pas.");
            }

            // Ajout du match dans la base de données
            _context.Matches.Add(newMatch);
            await _context.SaveChangesAsync();

            // Ajouter les statistiques des joueurs (PlayerStats)
            if (newMatch.PlayerStats != null && newMatch.PlayerStats.Any())
            {
                foreach (var playerStat in newMatch.PlayerStats)
                {
                    playerStat.MatchId = newMatch.Id; // Associe chaque stat au match créé
                    _context.PlayerStats.Add(playerStat);
                }
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetMatch", new { id = newMatch.Id }, newMatch);
        }




        // Endpoint pour récupérer un match par ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Matches>> GetMatchById(int id)
        {
            var match = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.PlayerStats)
                .ThenInclude(ps => ps.Player)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }

        // Endpoint pour récupérer tous les matchs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Matches>>> GetAllMatches()
        {
            var matches = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Include(m => m.PlayerStats)
                .ThenInclude(ps => ps.Player)
                .ToListAsync();

            return Ok(matches);
        }

        // Endpoint pour récupérer les équipes d'un match par ID
        [HttpGet("teams/{matchId}")]
        public async Task<ActionResult<object>> GetTeamsForMatch(int matchId)
        {
            var match = await _context.Matches
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .FirstOrDefaultAsync(m => m.Id == matchId);

            if (match == null)
            {
                return NotFound();  // Retourne 404 si le match n'existe pas
            }

            // Récupérer les informations des équipes avec les joueurs
            var teamsData = new
            {
                HomeTeam = new
                {
                    match.HomeTeam.Name,
                    Players = await _context.Players
                        .Where(p => p.TeamId == match.HomeTeamId)
                        .Select(p => new
                        {
                            p.Id,
                            p.FirstName,
                            p.LastName,
                            p.Position
                        }).ToListAsync()
                },
                AwayTeam = new
                {
                    match.AwayTeam.Name,
                    Players = await _context.Players
                        .Where(p => p.TeamId == match.AwayTeamId)
                        .Select(p => new
                        {
                            p.Id,
                            p.FirstName,
                            p.LastName,
                            p.Position
                        }).ToListAsync()
                }
            };

            return Ok(teamsData);  // Retourne les données des deux équipes
        }

        // Endpoint pour récupérer les matchs d'une équipe spécifique
        [HttpGet("team/{teamId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetMatchesByTeam(int teamId)
        {
            var matches = await _context.Matches
                .Where(m => m.HomeTeamId == teamId || m.AwayTeamId == teamId)
                .Include(m => m.HomeTeam)
                .Include(m => m.AwayTeam)
                .Select(m => new
                {
                    MatchId = m.Id,
                    MatchDate = m.MatchDate,
                    HomeTeam = new { m.HomeTeam.Id, m.HomeTeam.Name },
                    AwayTeam = new { m.AwayTeam.Id, m.AwayTeam.Name },
                    HomeTeamScore = m.HomeTeamScore,
                    AwayTeamScore = m.AwayTeamScore
                })
                .ToListAsync();

            if (!matches.Any())
            {
                return NotFound("Aucun match trouvé pour cette équipe.");
            }

            return Ok(matches);
        }

        // Endpoint pour récupérer la composition d'un match (joueurs affectés à ce match)
        [HttpGet("{matchId}/composition")]
        public async Task<ActionResult<object>> GetMatchComposition(int matchId)
        {
            var match = await _context.Matches
                .Include(m => m.PlayerStats)
                .ThenInclude(ps => ps.Player)
                .FirstOrDefaultAsync(m => m.Id == matchId);

            if (match == null)
            {
                return NotFound("Le match n'existe pas.");
            }

            // Récupérer la composition (les joueurs affectés au match)
            var composition = match.PlayerStats.Select(ps => new
            {
                ps.Player.FirstName,
                ps.Player.LastName,
                ps.Player.Position,
                //ps.Role // Si vous avez un rôle (titulaire, remplaçant, etc.)
            }).ToList();

            return Ok(composition);
        }

        // Endpoint pour mettre à jour la composition d'un match
        [HttpPut("{matchId}/composition")]
        public async Task<IActionResult> UpdateMatchComposition(int matchId, [FromBody] List<PlayerStats> updatedComposition)
        {
            var match = await _context.Matches
                .Include(m => m.PlayerStats)
                .ThenInclude(ps => ps.Player)
                .FirstOrDefaultAsync(m => m.Id == matchId);

            if (match == null)
            {
                return NotFound("Le match n'existe pas.");
            }

            // Supprimer les anciennes compositions (si nécessaire)
            _context.PlayerStats.RemoveRange(match.PlayerStats);

            // Ajouter les nouvelles compositions
            foreach (var playerStat in updatedComposition)
            {
                playerStat.MatchId = matchId;
                _context.PlayerStats.Add(playerStat);
            }

            await _context.SaveChangesAsync();

            return Ok("Composition mise à jour.");
        }




    }
}
