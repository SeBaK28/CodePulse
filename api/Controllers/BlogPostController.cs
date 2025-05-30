using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models.Domain;
using api.Models.Dtos;
using api.Repository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/blogPost")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPost _blogRepo;

        public BlogPostController(IBlogPost blogRepo)
        {
            _blogRepo = blogRepo;
        }

        [HttpPost]
        public async Task<IActionResult> NewBlogPost([FromBody] AddBlogPostDto post)
        {
            var blog = new BlogPost
            {
                Title = post.Title,
                ShortDescription = post.ShortDescription,
                Content = post.Content,
                FeaturedImageURL = post.FeaturedImageURL,
                URLHandle = post.URLHandle,
                CreatedAt = post.CreatedAt,
                Author = post.Author,
                IsVisible = post.IsVisible
            };

            await _blogRepo.AddBlogPostAsync(blog);

            var response = new BlogPostDto
            {
                Id = blog.Id,
                Title = blog.Title,
                ShortDescription = blog.ShortDescription,
                Content = blog.Content,
                FeaturedImageURL = blog.FeaturedImageURL,
                URLHandle = blog.URLHandle,
                CreatedAt = blog.CreatedAt,
                Author = blog.Author,
                IsVisible = blog.IsVisible
            };

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogPost()
        {
            var elem = await _blogRepo.GetAllBlogPostAsync();

            var response = new List<BlogPostDto>();

            foreach (var elems in elem)
            {
                response.Add(new BlogPostDto
                {
                    Id = elems.Id,
                    Title = elems.Title,
                    ShortDescription = elems.ShortDescription,
                    Content = elems.Content,
                    FeaturedImageURL = elems.FeaturedImageURL,
                    URLHandle = elems.URLHandle,
                    CreatedAt = elems.CreatedAt,
                    Author = elems.Author,
                    IsVisible = elems.IsVisible
                });
            }

            return Ok(response);
        }
    }
}