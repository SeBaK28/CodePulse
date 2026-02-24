using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos
{
    public class LoginResponseDto
    {
        public string Email { get; set; }
        public ICollection<string> Roles { get; set; }
    }
}