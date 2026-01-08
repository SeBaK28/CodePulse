using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BlogPostRepository : IBlogPost
    {
        public readonly ApplicationDbContext _context;

        public BlogPostRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<BlogPost> AddBlogPostAsync(BlogPost post)
        {
            await _context.BlogPosts.AddAsync(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<List<BlogPost>> GetAllBlogPostAsync()
        {
            return await _context.BlogPosts.Include(x=>x.Categories).ToListAsync();
        }
    }
}