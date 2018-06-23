using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ChatBSP.Models
{
    public class UserUpdateRequest
    {
        [Required]
        public int? Id { get; set; }
        [MaxLength(50)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }
        [MaxLength(100)]
        public string ImageURL { get; set; }
        [MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(100)]
        public string GoogleId { get; set; }
    }
}