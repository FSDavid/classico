using classico.Models.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Data
{
    //add - migration:
    //1. migrate in startup
    //2. add-migration personsPersonalInfoMigration -OutputDir Data/Migrations/PersonsPersonalInfoMigrations -context PersonsPersonalInfoDbContext
    //3. update-database personsPersonalInfoMigration -c PersonsPersonalInfoDbContext

    //1. add-migration applicationDbContextMigration1.01 -OutputDir Migrations -context applicationDbContext
    //2. update-database applicationDbContextMigration1.01 -c ApplicationDbContext
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Customer> Customers { get; set; }
    }
}
