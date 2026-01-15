using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos
{
    public class BlogImageDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public string Title { get; set; }
        public string URL { get; set; }
        public DateTime DateCreated { get; set; }
    }
}