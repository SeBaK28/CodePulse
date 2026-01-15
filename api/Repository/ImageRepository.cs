using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models.Domain;

namespace api.Repository
{
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _accessor;

        public ImageRepository(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor accessor)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _accessor = accessor;
        }

        public IHttpContextAccessor Accessor { get; }

        public async Task<BlogImage> Upload(IFormFile file, BlogImage image)
        {
            //save image to api/images
            //webHostEnvironment.ContentRootPath points to the api, "Images" - it's the name of folder where will be save image
            var localpath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", $"{image.FileName}{image.FileExtension}");

            //FileStream it's channel to connect api with any file system
            //FileMode.Create is using to create new file or override if this file is already exist
            //using - after action file will be closed and resources released
            using var stream = new FileStream(localpath, FileMode.Create);
            await file.CopyToAsync(stream);

            //update db
            var httpRequest = _accessor.HttpContext.Request;
            //.Scheme return http or https
            //.Host return website name
            //.PathBase optional folder
            var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/Images/{image.FileName}{image.FileExtension}";

            image.URL = urlPath;

            await _context.BlogImages.AddAsync(image);
            await _context.SaveChangesAsync();

            return image;
        }
    }
}