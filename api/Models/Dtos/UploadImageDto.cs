using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos
{
    public class UploadImageDto
    {
        public FormFile file { get; set; }
        public string fileName { get; set; }
        public string title { get; set; }
    }
}