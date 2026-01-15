using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Domain;

namespace api.Interfaces
{
    public interface IImageRepository 
    {
        Task<BlogImage> Upload(IFormFile file, BlogImage image);
    }
}