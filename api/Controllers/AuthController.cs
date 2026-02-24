using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            _userManager = userManager;
            _tokenRepository = tokenRepository;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody]RegisterRequestDto requestDto)
        {
            var user = new IdentityUser
            {
                UserName = requestDto.Email?.Trim(),
                Email = requestDto.Email?.Trim(),
            };

            var identityResult =await _userManager.CreateAsync(user, requestDto.Password);

            if (identityResult.Succeeded)
            {
                identityResult = await _userManager.AddToRoleAsync(user, "Reader");

                if (identityResult.Succeeded)
                {
                    return Ok();
                }else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach(var error in identityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            else
            {
                if (identityResult.Errors.Any())
                {
                    foreach(var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return ValidationProblem(ModelState);

        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody]LoginRequestDto loginDto)
        {
            var identityUser = await _userManager.FindByEmailAsync(loginDto.Email);

            if(identityUser is not null)
            {
                var passwordResult = await _userManager.CheckPasswordAsync(identityUser,loginDto.Password);

                if (passwordResult)
                {
                    var roles = await _userManager.GetRolesAsync(identityUser);
                    var jwtToken = _tokenRepository.CreateJwtToken(identityUser, roles.ToList());
                    var response = new LoginResponseDto
                    {
                        Email = loginDto.Email,
                        Roles = roles,
                    };

                    Response.Cookies.Append("access_token", jwtToken, new CookieOptions
                    {
                       HttpOnly = true,
                       Secure = true,
                       SameSite = SameSiteMode.None,
                       Expires = DateTime.Now.AddMinutes(15)
                    });

                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or password Incorrect");

            return ValidationProblem(ModelState);
        }

        [Authorize]
        [HttpGet]
        [Route("me")]
        public IActionResult UserDetails()
        {
            if(User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var response = new LoginResponseDto
            {
                Email = User.FindFirst(ClaimTypes.Email)?.Value,
                Roles = User.FindAll(ClaimTypes.Role).Select(x=>x.Value).ToList()
            };

            return Ok(response);
        }
    
        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            //Override the previous cookie
            Response.Cookies.Append("access_token", "", new CookieOptions
                    {
                       HttpOnly = true,
                       Secure = true,
                       SameSite = SameSiteMode.None,
                       Expires = DateTime.Now.AddDays(-1) //previous day
                    });
            
            return Ok();
        }
    }
}