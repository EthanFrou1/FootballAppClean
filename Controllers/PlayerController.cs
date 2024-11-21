using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballApp.Models;

namespace FootballApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly FootballContext _context;

        public PlayerController(FootballContext context)
        {
            _context = context;
        }

        // POST: api/Player
       [HttpPost]
        public async Task<IActionResult> AddPlayer([FromBody] Player newPlayer)
        {
            if (newPlayer == null)
            {
                return BadRequest("Les données du joueur sont invalides");
            }

            // Ajouter le joueur dans la base de données
            _context.Players.Add(newPlayer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayer", new { id = newPlayer.Id }, newPlayer);
        }

        // GET: api/Player/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            var player = await _context.Players
                                    .FirstOrDefaultAsync(p => p.Id == id);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetAllPlayer()
        {
            var players = await _context.Players.ToListAsync();

            if (players == null || players.Count == 0)
            {
                return NotFound();
            }

            return Ok(players);
        }

        // GET: api/PlayerStats/5
        [HttpGet("playerstats/{playerId}")]
        public async Task<ActionResult<PlayerStats>> GetPlayerStats(int playerId)
        {
            var playerStats = await _context.PlayerStats
                                              .FirstOrDefaultAsync(ps => ps.PlayerId == playerId);

            if (playerStats == null)
            {
                return NotFound();
            }

            return Ok(playerStats);
        }

        // GET: api/PlayerStats/{playerId}/{matchId}
        [HttpGet("playerstats/{playerId}/{matchId}")]
        public async Task<ActionResult<PlayerStats>> GetPlayerStats(int playerId, int matchId)
        {
            var playerStats = await _context.PlayerStats
                                            .FirstOrDefaultAsync(ps => ps.PlayerId == playerId && ps.MatchId == matchId);

            if (playerStats == null)
            {
                return NotFound();
            }

            return Ok(playerStats);
        }


    }
}
