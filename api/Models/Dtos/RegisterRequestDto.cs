using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Dtos
{
    public class RegisterRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}