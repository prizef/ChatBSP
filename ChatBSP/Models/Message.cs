using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChatBSP.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderUserId { get; set; }
        public int GroupId { get; set; }
        public string MessageContent { get; set; }
    }
}