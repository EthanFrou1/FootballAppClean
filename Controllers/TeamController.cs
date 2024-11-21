using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballApp.Models;
using System.Collections;

namespace FootballApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly FootballContext _context;

        public TeamController(FootballContext context)
        {
            _context = context;
        }

        // POST: api/Team
        [HttpPost]
        public async Task<IActionResult> AddTeam([FromBody] Team newTeam)
        {
            if (newTeam == null)
            {
                return BadRequest("Les données de l'équipe sont invalides");
            }

            // Vérifier si le club existe déjà
            var existingClub = await _context.Clubs.FirstOrDefaultAsync(c => c.Id == newTeam.ClubId);

            if (existingClub == null)
            {
                return BadRequest("Le club spécifié n'existe pas dans la base de données.");
            }

            // Vérifier si l'équipe existe déjà
            var existingTeam = await _context.Teams
                .FirstOrDefaultAsync(t => t.Name == newTeam.Name && t.City == newTeam.City);

            if (existingTeam != null)
            {
                return Conflict("Une équipe avec ce nom et cette ville existe déjà.");
            }

            _context.Teams.Add(newTeam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeam", new { id = newTeam.Id }, newTeam);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        // GET: api/Team
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetAllTeam()
        {
            var teams = await _context.Teams.ToListAsync();

            if (teams == null || teams.Count == 0)
            {
                return NotFound();
            }

            return Ok(teams);
        }

        [HttpGet("with-players")]
        public async Task<ActionResult<IEnumerable>> GetTeamsWithPlayers(int? homeTeamId, int? awayTeamId, int? matchId, int? teamId)
        {
            var query = _context.Teams.AsQueryable();

            // Filtrer par teamId si passé
            if (teamId.HasValue)
            {
                query = query.Where(t => t.Id == teamId.Value); // Vérifie que l'ID correspond
            }
            else
            {
                // Filtrer par homeTeamId ou awayTeamId si fourni
                if (homeTeamId.HasValue || awayTeamId.HasValue)
                {
                    query = query.Where(t =>
                        (homeTeamId.HasValue && t.Id == homeTeamId.Value) ||
                        (awayTeamId.HasValue && t.Id == awayTeamId.Value)
                    );
                }
            }

            // Inclure les joueurs
            var teams = await query
                .Include(t => t.Players) // Inclure tous les joueurs
                .ThenInclude(p => p.PlayerStats) // Inclure les statistiques des joueurs
                .Where(t => !matchId.HasValue || t.Players.Any(p => p.PlayerStats.Any(s => s.MatchId == matchId))) // Filtrer par matchId si nécessaire
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.City,
                    Players = t.Players.Select(p => new
                    {
                        p.Id,
                        p.FirstName,
                        p.LastName,
                        p.Position,
                        Stats = p.PlayerStats
                            .Where(s => !matchId.HasValue || s.MatchId == matchId) // Appliquer le filtrage par matchId si fourni
                            .Select(s => new
                            {
                                s.Goals,
                                s.Assists
                            })
                            .FirstOrDefault() // Récupérer les stats du premier match trouvé (ou null si aucune)
                    }).ToList()
                })
                .ToListAsync();

            if (!teams.Any())
            {
                return NotFound("Aucune équipe trouvée.");
            }

            return Ok(teams);
        }



    }
}
