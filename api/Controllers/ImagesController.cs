using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models.Domain;
using api.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController :ControllerBase
    {
        private readonly IImageRepository _imageRepo;

        public ImagesController(IImageRepository imageRepo)
        {
            _imageRepo = imageRepo;
        }

        [HttpPost]
        // public async Task<IActionResult> UploadImage([FromForm]IFormFile file, [FromForm]string fileName, [FromForm]string title)
        public async Task<IActionResult> UploadImage([FromForm]UploadImageDto uploadDto)
        {
            //ValidateFileUpload(uploadDto.file);

            if (ModelState.IsValid)  //if there is no error in modelstate
            {
                var blogImage = new BlogImage
                {
                    FileExtension = Path.GetExtension(uploadDto.fileName).ToLower(),
                    FileName = uploadDto.fileName,
                    Title = uploadDto.title,
                    DateCreated = DateTime.Now
                };

                blogImage = await _imageRepo.Upload(uploadDto.file ,blogImage);

                var response = new BlogImageDto
                {
                    Id = blogImage.Id,
                    Title = blogImage.Title,
                    DateCreated = blogImage.DateCreated,
                    FileExtension = blogImage.FileExtension,
                    FileName = blogImage.FileName,
                    URL = blogImage.URL,
                };
                return Ok(response);
            }

            return BadRequest(ModelState);
        }

        private void ValidateFileUpload(IFormFile file)
        {
            var allowedExtensions = new string[] {".jpg", ".jpeg", ".png"};

            if (!allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file format");
            }

            if(file.Length > 10485760) //10MB
            {
                ModelState.AddModelError("file", "File size cannot be more than 10MB");
            }
        }
        
    }
}