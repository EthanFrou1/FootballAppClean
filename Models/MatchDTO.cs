
namespace FootballApp.Models
{

    public class MatchDTO
    {
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
        public DateTime MatchDate { get; set; }
        public List<PlayerStatsDTO> PlayerStats { get; set; }
    }

    public class PlayerStatsDTO
    {
        public int PlayerId { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
    }
}