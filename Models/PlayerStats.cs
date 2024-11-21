namespace FootballApp.Models
{
    public class PlayerStats
    {
        public int Id { get; set; }
        public int MatchId { get; set; }
        public int PlayerId { get; set; }
        public int? Goals { get; set; }
        public int? Assists { get; set; }
        public int? YellowCards { get; set; }
        public int? RedCards { get; set; }

        // Navigation properties
        public Matches Match { get; set; }
        public Player Player { get; set; }
    }
}
