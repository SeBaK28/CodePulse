using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models.Domain;
using api.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoriesController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
        {

            //Map Dto to Domain
            var category = new Category
            {
                Name = request.Name,
                URLHandle = request.URLHandle
            };

            await _categoryRepo.CreateAsync(category);

            //Map Domain to Dto
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                URLHandle = category.URLHandle
            };

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategory()
        {
            var elem = await _categoryRepo.GetAllAsync();

            var response = new List<CategoryDto>();

            foreach (var elems in elem)
            {
                response.Add(new CategoryDto
                {
                    Id = elems.Id,
                    Name = elems.Name,
                    URLHandle = elems.URLHandle
                });
            }

            return Ok(response);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetByIdCategory([FromRoute] Guid id)
        {
            var isExist = await _categoryRepo.GetByIdAsync(id);

            if (isExist is null)
            {
                return NotFound();
            }

            var response = new CategoryDto
            {
                Id = isExist.Id,
                Name = isExist.Name,
                URLHandle = isExist.URLHandle,
            };

            return Ok(response);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, UpdateCategoryRequestDto updateCategory)
        {
            var category = new Category
            {
                Id = id,
                Name = updateCategory.Name,
                URLHandle = updateCategory.URLHandle
            };

            category = await _categoryRepo.UpdateAsync(category);

            if (category is null)
            {
                return NotFound();
            }

            var update = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                URLHandle = category.URLHandle
            };
            return Ok(update);
        }
    }
} 