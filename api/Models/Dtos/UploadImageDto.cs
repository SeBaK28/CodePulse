using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos
{
    public class UploadImageDto
    {
        public IFormFile File { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
    }
}