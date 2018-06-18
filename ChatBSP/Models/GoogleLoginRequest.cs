using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ChatBSP.Models
{
    public class GoogleLoginRequest
    {
        [Required]
        public string GoogleToken { get; set; }
    }
}