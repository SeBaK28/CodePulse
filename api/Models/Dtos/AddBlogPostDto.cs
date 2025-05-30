using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos
{
    public class AddBlogPostDto
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public string FeaturedImageURL { get; set; }
        public string URLHandle { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Author { get; set; }
        public bool IsVisible { get; set; }
    }
}