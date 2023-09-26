using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class UpdateUserDto
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        protected string NormalizedUserName { get; set; }
        [Required]
        public string Email { get; set; }
        protected string NormalizedEmail { get; set; }

    }
}