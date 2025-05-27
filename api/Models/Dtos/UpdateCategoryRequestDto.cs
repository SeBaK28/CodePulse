using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos
{
    public class UpdateCategoryRequestDto
    {
        public string Name { get; set; }
        public string URLHandle { get; set; }
    }
}