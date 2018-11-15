using ChatBSP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatBSP.Services
{
    public interface IUsersService
    {
        bool GoogleSignin(GoogleSigninRequest model);
        User GetCurrentUser(int id);
        List<User> GetAll();
        User GetById(int id);
        void Update(UserUpdateRequest model);
        void Delete(int id);
    }
}
