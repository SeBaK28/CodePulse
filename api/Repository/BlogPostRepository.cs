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

        public async Task<BlogPost?> DeleteBlogPostAsync(Guid id)
        {
            var findBlogPost = await _context.BlogPosts.FirstOrDefaultAsync(x=>x.Id.Equals(id));

            if(findBlogPost is null)
            {
                return null;
            }

            _context.Remove(findBlogPost);
            await _context.SaveChangesAsync();
            return findBlogPost;
        }

        public async Task<List<BlogPost>> GetAllBlogPostAsync()
        {
            return await _context.BlogPosts.Include(x=>x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> GetBlogPostByIdAsync(Guid id)
        {
            return await _context.BlogPosts.Include(x=>x.Categories).FirstOrDefaultAsync(x=>x.Id == id);
        }

        public async Task<BlogPost?> UpdateBlogPostAsync(BlogPost blogPost)
        {
            var findBlogPost = await _context.BlogPosts.Include(x=>x.Categories).FirstOrDefaultAsync(x=>x.Id == blogPost.Id);

            if(findBlogPost is not null)
            {
                _context.Entry(findBlogPost).CurrentValues.SetValues(blogPost);
                findBlogPost.Categories = blogPost.Categories;
                await _context.SaveChangesAsync();
                return blogPost;
            }
            return null;
        }
    }
}