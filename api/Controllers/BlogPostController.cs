using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
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
        private readonly ICategoryRepository _categoryRepo;

        public BlogPostController(IBlogPost blogRepo, ICategoryRepository categoryRepo)
        {
            _blogRepo = blogRepo;
            _categoryRepo = categoryRepo;
            
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
                IsVisible = post.IsVisible,
                Categories = new List<Category>()
            };

            foreach(var categoryGuid in post.Categories)
            {
                var existingCategory = await _categoryRepo.GetByIdAsync(categoryGuid);
                if(existingCategory is not null)
                {
                    blog.Categories.Add(existingCategory);
                }
            }

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
                IsVisible = blog.IsVisible,
                Categories = blog.Categories.Select(x=> new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    URLHandle = x.URLHandle
                }).ToList()
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
                    IsVisible = elems.IsVisible,
                    Categories = elems.Categories.Select(x=>new CategoryDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        URLHandle = x.URLHandle
                    }).ToList()
                });
            }

            return Ok(response);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute]Guid id)
        {
            var isExist = await _blogRepo.GetBlogPostByIdAsync(id);

            if(isExist is null)
            {
                return NotFound();
            }

            var response = new BlogPostDto
            {
                Id = isExist.Id,
                Title = isExist.Title,
                ShortDescription = isExist.ShortDescription,
                Content = isExist.Content,
                FeaturedImageURL = isExist.FeaturedImageURL,
                URLHandle = isExist.URLHandle,
                CreatedAt = isExist.CreatedAt,
                Author = isExist.Author,
                IsVisible = isExist.IsVisible,
                Categories = isExist.Categories.Select(x=> new CategoryDto
                {
                    Id =x.Id,
                    Name = x.Name,
                    URLHandle = x.URLHandle 
                }).ToList()
            };
            return Ok(response);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateBlogPost([FromRoute] Guid id, UpdateBlogPostRequestDto updateDto)
        {
            var updatedBlogPost = new BlogPost
            {
                Id = id,
                Title = updateDto.Title,
                ShortDescription = updateDto.ShortDescription,
                Content = updateDto.Content,
                FeaturedImageURL = updateDto.FeaturedImageURL,
                URLHandle = updateDto.URLHandle,
                CreatedAt = updateDto.CreatedAt,
                Author = updateDto.Author,
                IsVisible = updateDto.IsVisible,
                Categories = new List<Category>()
            };

            foreach(var item in updateDto.Categories)
            {
                var existingCategory = await _categoryRepo.GetByIdAsync(item);

                if(existingCategory is not null)
                {
                    updatedBlogPost.Categories.Add(existingCategory);
                }
            };

            var request = await _blogRepo.UpdateBlogPostAsync(updatedBlogPost);

            if(request is null)
            {
                return NotFound();
            }

            var update = new BlogPostDto
            {
                Id = updatedBlogPost.Id,
                Title = updatedBlogPost.Title,
                ShortDescription = updatedBlogPost.ShortDescription,
                Content = updatedBlogPost.Content,
                FeaturedImageURL = updatedBlogPost.FeaturedImageURL,
                URLHandle = updatedBlogPost.URLHandle,
                CreatedAt = updatedBlogPost.CreatedAt,
                Author = updatedBlogPost.Author,
                IsVisible = updatedBlogPost.IsVisible,
                Categories = updatedBlogPost.Categories.Select(x=> new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    URLHandle = x.URLHandle
                }).ToList()
            };

            return Ok(update);


        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
            var response = await _blogRepo.DeleteBlogPostAsync(id);

            if(response is null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}