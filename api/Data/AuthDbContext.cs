using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            var readerRoleId = "a4e1c9f2-3b7d-4a6e-9c81-2f5b8d7a6e44";
            var writerRoleId = "6f1d8b3c-9a2e-4f47-b5c1-0a9d7e6c2f11";

            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id=  readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },

                new IdentityRole()
                {
                    Id = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = writerRoleId
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);

            var adminRoleId = "b73e9a2d-5c41-4e8a-9f6b-1d2c3a4e5f60";
    
            var admin = new IdentityUser()
            {
                Id = adminRoleId,
                UserName = "admin@admin.com",
                Email = "admin@admin.com",
                NormalizedEmail = "admin@admin.com".ToUpper(),
                NormalizedUserName= "admin@admin.com".ToUpper()
            };

            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin123");

            builder.Entity<IdentityUser>().HasData(admin);

            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new ()
                {
                    UserId = adminRoleId,
                    RoleId = readerRoleId,                    
                },
                new()
                {
                    UserId = adminRoleId,
                    RoleId = writerRoleId,
                }
            };
            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);


        }
    }
}