using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Domain;

namespace api.Interfaces
{
    public interface IBlogPost
    {
        Task<BlogPost?> AddBlogPostAsync(BlogPost post);
        Task<List<BlogPost>> GetAllBlogPostAsync();
    }
}