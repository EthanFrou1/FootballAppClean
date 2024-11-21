using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FootballApp.Models; // Importer le namespace pour vos modèles
using System.Linq;
using System.Threading.Tasks;

namespace FootballApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubController : ControllerBase
    {
        private readonly FootballContext _context;

        // Constructeur pour injecter le contexte de la base de données
        public ClubController(FootballContext context)
        {
            _context = context;
        }

        // GET: api/Club/cities (Obtenir toutes les villes)
        [HttpGet("cities")]
        public async Task<ActionResult<IEnumerable<string>>> GetCities()
        {
            var cities = await _context.Clubs
                .Select(c => c.City) // Sélectionner uniquement les villes
                .Distinct() // Assurer que les villes sont uniques
                .ToListAsync();

            return Ok(cities); // Retourner la liste des villes distinctes
        }

        // GET: api/Club/by-postal-code/{codePostal}
        [HttpGet("by-postal-code/{codePostal}")]
        public async Task<ActionResult<IEnumerable<Club>>> GetClubsByPostalCode(string codePostal)
        {
            var clubs = await _context.Clubs
                .Where(c => c.CodePostal == codePostal)
                .ToListAsync();

            if (clubs == null || !clubs.Any())
            {
                return NotFound($"Aucun club trouvé pour le code postal {codePostal}");
            }

            return Ok(clubs);
        }

        // GET: api/club
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Club>>> GetAllClubs()
        {
            var clubs = await _context.Clubs.ToListAsync();
            return Ok(clubs);
        }

        // GET: api/club-with-teams
        [HttpGet("club-with-teams")]
        public async Task<ActionResult<IEnumerable<Club>>> GetClubsWithTeams()
        {
            // Utilisation de Include pour charger les équipes associées à chaque club
            var clubs = await _context.Clubs.Include(c => c.Teams).ToListAsync();

            // Retourner la liste des clubs avec leurs équipes associées
            return Ok(clubs);
        }


    }
}
