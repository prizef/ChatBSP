using ChatBSP.Models;
using ChatBSP.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Security;

namespace ChatBSP.Controllers
{
    public class UsersController : ApiController
    {
        readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        [Route("api/users/googlesignin"), HttpPost, AllowAnonymous]
        public HttpResponseMessage GoogleSignin(GoogleSigninRequest model)
        {
            bool authToken = usersService.GoogleSignin(model);
            if (!authToken)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "User cannot be authenticated");
            }
            return Request.CreateResponse(HttpStatusCode.OK, authToken);
        }

        [Route("api/users/getcurrentuser"), HttpGet]
        public HttpResponseMessage GetCurrentUser()
        {
            var currentUser = new User();
            if (HttpContext.Current.User.Identity.IsAuthenticated)
            {
                var userId = HttpContext.Current.User.Identity.Name;
                currentUser = usersService.GetCurrentUser(Convert.ToInt32(userId));
            }
            return Request.CreateResponse(HttpStatusCode.OK, currentUser);
        }

        [Route("api/users"), HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<User> users = usersService.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, users);
        }

        [Route("api/users/{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            User user = usersService.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, user);
        }

        [Route("api/users/{id:int}"), HttpPut]
        public HttpResponseMessage Update(int id, UserUpdateRequest model)
        {
            if (model == null)
            {
                ModelState.AddModelError("", "You did not send any body data!");
            }
            if (model.Id != id)
            {
                ModelState.AddModelError("", "Id in the URL does not match the Id in the body");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            usersService.Update(model);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("api/users/{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            usersService.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

    }
}
