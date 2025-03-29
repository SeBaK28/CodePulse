using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos
{
    public class CreateCategoryRequestDto
    {
        public string Name { get; set; }
        public string URLHandle { get; set; }
    }
}