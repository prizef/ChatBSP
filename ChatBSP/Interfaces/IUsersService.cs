using ChatBSP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatBSP.Services
{
    interface IUsersService
    {
        bool GoogleLogin(GoogleLoginRequest model);
    }
}
