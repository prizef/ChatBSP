﻿using ChatBSP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatBSP
{
    public interface IChatService
    {
        List<Message> GetChatByGroupId(int userId);
    }
}
