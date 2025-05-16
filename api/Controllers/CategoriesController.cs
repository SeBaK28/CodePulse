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
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
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
        public async Task<IActionResult> GetAll(){
            var elem = await _categoryRepo.GetAllAsync();
            var stock = elem.Select(e => e)
        }
    }
}