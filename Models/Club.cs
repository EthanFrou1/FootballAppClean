using System.ComponentModel.DataAnnotations.Schema;

namespace FootballApp.Models
{
    public class Club
    {
        public int Id { get; set; }
        public string Name { get; set; }  // Nom du club
        public string City { get; set; }  // Ville du club

        [Column("code_postal")]
        public string CodePostal { get; set; }  // Code postal du club

        // Navigation property pour récupérer les équipes
        public ICollection<Team>? Teams { get; set; }
    }
}
