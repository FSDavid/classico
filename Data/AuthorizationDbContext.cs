using classico.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Data
{
    public class AuthorizationDbContext : DbContext
    {
        public AuthorizationDbContext(DbContextOptions<AuthorizationDbContext> options) : base(options)
        {

        }

        public AuthorizationDbContext()
        {
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }

    }
}
