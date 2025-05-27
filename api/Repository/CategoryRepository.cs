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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> DeleteAsync(Guid id)
        {
            var response = await _context.Categories.FirstOrDefaultAsync(x => x.Id.Equals(id));
            if (response is not null)
            {
                _context.Remove(response);
                await _context.SaveChangesAsync();
                return response;
            }
            return null;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
            
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }

        public async Task<Category?> UpdateAsync(Category category)
        {
            var findCategory = await _context.Categories.FirstOrDefaultAsync(x => x.Id.Equals(category.Id));

            if (findCategory is not null)
            {
                _context.Entry(findCategory).CurrentValues.SetValues(category);
                await _context.SaveChangesAsync();
                return category;
            }

            return null;
        }
    }
}