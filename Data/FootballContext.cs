using Microsoft.EntityFrameworkCore;
using FootballApp.Models; // Assurez-vous d'importer le bon namespace

public class FootballContext : DbContext
{
    public DbSet<Player> Players { get; set; }

    public DbSet<Team> Teams { get; set; }

    // Propriété DbSet pour la table Clubs
    public DbSet<Club> Clubs { get; set; }

    public FootballContext(DbContextOptions<FootballContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseMySql(
                "Server=localhost;Port=3306;Database=foot3000db;User=root;Password=root;", 
                ServerVersion.AutoDetect("Server=localhost;Port=3306;Database=foot3000db;User=root;Password=root;"));
        }
    }
}
