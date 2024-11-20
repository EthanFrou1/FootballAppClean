using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballApp.Models;

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

            // Vérifier si le club existe déjà dans la base de données par son ID
            var existingClub = await _context.Clubs
                .FirstOrDefaultAsync(c => c.Id == newTeam.ClubId);

            if (existingClub == null)
            {
                // Si le club n'existe pas, renvoyer une erreur
                return BadRequest("Le club spécifié n'existe pas dans la base de données.");
            }

            // Vérifier si l'équipe existe déjà dans la table teams
            var existingTeam = await _context.Teams
                .FirstOrDefaultAsync(t => t.Name == newTeam.Name && t.City == newTeam.City);

            if (existingTeam != null)
            {
                return Conflict("Une équipe avec ce nom et cette ville existe déjà.");
            }

            // Ajouter l'équipe à la table
            _context.Teams.Add(newTeam);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeam", new { id = newTeam.Id }, newTeam);
        }

        // GET: api/team/{teamId}
        [HttpGet("{teamId}")]
        public async Task<ActionResult> GetPlayersByTeam(int teamId)
        {
            // Cherche l'équipe par ID
            var team = await _context.Teams
                .Include(t => t.Players) // Inclure la collection des joueurs associés à cette équipe
                .FirstOrDefaultAsync(t => t.Id == teamId);

            if (team == null)
            {
                return NotFound($"Équipe avec l'ID {teamId} non trouvée.");
            }

            // Si l'équipe n'a pas de joueurs, on renvoie un message indiquant qu'il n'y a pas de joueurs
            if (team.Players == null || !team.Players.Any())
            {
                return NotFound("Aucun joueur trouvé pour cette équipe.");
            }

            // Si l'équipe existe, retourner la liste des joueurs
            var players = team.Players.Select(p => new
            {
                p.Id,
                p.FirstName,
                p.LastName,
                p.Position,
                p.TeamId
            }).ToList();

            return Ok(players); // Renvoie la liste des joueurs en JSON
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



    }
}
