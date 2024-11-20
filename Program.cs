using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Ajouter les services au conteneur.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configurer la connexion à la base de données (ajuste cette partie si nécessaire)
builder.Services.AddDbContext<FootballContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

// Ajouter la configuration CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
        builder.WithOrigins("http://localhost:3000") // Autorise le front-end React
               .AllowAnyHeader()
               .AllowAnyMethod());
});

// Construire l'application
var app = builder.Build();

// Utiliser CORS pour autoriser les requêtes du front-end
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

// Démarrer l'application
app.Run();
