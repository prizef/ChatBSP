using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatBSP.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageURL { get; set; }
        public string Email { get; set; }
        public string GoogleId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}