using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FootballApp.Models
{
    public class Matches
    {
        public int Id { get; set; }

        [Column("home_team_id")]
        public int HomeTeamId { get; set; }

        [Column("away_team_id")]
        public int AwayTeamId { get; set; }

        [Column("home_team_score")]
        public int HomeTeamScore { get; set; }

        [Column("away_team_score")]
        public int AwayTeamScore { get; set; }

        [Column("match_date")]
        public DateTime MatchDate { get; set; }  // Utilisation de 'match_date' pour correspondre à la base de données

        public Team HomeTeam { get; set; }
        public Team AwayTeam { get; set; }
        
        [JsonIgnore]
        public ICollection<PlayerStats> PlayerStats { get; set; }
    }

}


