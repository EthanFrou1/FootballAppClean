using System.ComponentModel.DataAnnotations.Schema;

namespace FootballApp.Models
{

    [Table("Teams")]
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public int ClubId { get; set; }

        // Navigation property pour récupérer les joueurs de l'équipe
        public ICollection<Player> Players { get; set; }
    }

}
    