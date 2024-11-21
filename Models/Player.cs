

namespace FootballApp.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string LastName { get; set; }

        public string FirstName { get; set; }
        public string Position { get; set; }

        // Clé étrangère pour lier un joueur à une équipe
        public int TeamId { get; set; }

        public DateTime DateOfBirth { get; set; } 

        // Relation avec PlayerStats
        public ICollection<PlayerStats>? PlayerStats { get; set; }
    }
}
