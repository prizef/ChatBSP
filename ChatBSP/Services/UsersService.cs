using ChatBSP.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Security;

namespace ChatBSP.Services
{
    public class UsersService : IUsersService
    {
        private IDataProvider dataProvider;

        public UsersService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public bool GoogleSignin(GoogleSigninRequest model)
        {
            bool userAuthenticated = false;
            int userId = 0;

            string googleClientId = "58772775873-oma31jtiqhph7os62h7i9a37makcilfr.apps.googleusercontent.com";
            string gapiRespObject;
            string gapiAuthUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=";
            HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(gapiAuthUrl + model.GoogleToken);
            webReq.Method = "GET";
            HttpWebResponse webResp = (HttpWebResponse)webReq.GetResponse();
            using (Stream stream = webResp.GetResponseStream())
            {
                StreamReader reader = new StreamReader(stream, System.Text.Encoding.UTF8);
                gapiRespObject = reader.ReadToEnd();
            }

            var gapiRespString = (JObject)JsonConvert.DeserializeObject(gapiRespObject);
            string authAud = gapiRespString["aud"].Value<string>();
            string authFirstName = gapiRespString["given_name"].Value<string>();
            string authLastName = gapiRespString["family_name"].Value<string>();
            string authImage = gapiRespString["picture"].Value<string>();
            string authEmail = gapiRespString["email"].Value<string>();

            if (authAud == googleClientId)
            {
                userAuthenticated = true;

                dataProvider.ExecuteProcedure(
                "Users_GoogleSignin",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@FirstName", authFirstName);
                    parameters.AddWithValue("@LastName", authLastName);
                    parameters.AddWithValue("@ImageURL", authImage);
                    parameters.AddWithValue("@Email", authEmail);
                    parameters.AddWithValue("@GoogleId", authAud);
                },
                rowMapper: (parameters) =>
                {
                    userId = (int)parameters["Id"];
                });

                FormsAuthentication.SetAuthCookie(Convert.ToString(userId), true);
            }
            return userAuthenticated;
        }

        public List<User> GetAll()
        {
            List<User> results = new List<User>();
            dataProvider.ExecuteProcedure(
                "Users_GetAll",
                rowMapper: (parameters) =>
                {
                    User user = new User();
                    user.Id = (int)parameters["Id"];
                    user.FirstName = (string)parameters["FirstName"];
                    user.LastName = (string)parameters["LastName"];
                    user.ImageURL = (string)parameters["ImageURL"];
                    user.Email = (string)parameters["Email"];
                    user.GoogleId = (string)parameters["GoogleId"];
                    user.DateCreated = (DateTime)parameters["DateCreated"];
                    user.DateModified = (DateTime)parameters["DateModified"];
                    results.Add(user);
                });
            return results;
        }

        public User GetById(int id)
        {
            User result = new User();
            dataProvider.ExecuteProcedure(
                "Users_GetById",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                rowMapper: (reader) =>
                {
                    result.Id = (int)reader["Id"];
                    result.FirstName = (string)reader["FirstName"];
                    result.LastName = (string)reader["LastName"];
                    result.ImageURL = (string)reader["ImageURL"];
                    result.Email = (string)reader["Email"];
                    result.GoogleId = (string)reader["GoogleId"];
                    result.DateCreated = (DateTime)reader["DateCreated"];
                    result.DateModified = (DateTime)reader["DateModified"];
                });
            return result;
        }

        public void Update(UserUpdateRequest model)
        {
            dataProvider.ExecuteProcedure(
                "Users_Update",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Id", model.Id);
                    parameters.AddWithValue("@FirstName", model.FirstName);
                    parameters.AddWithValue("@LastName", model.LastName);
                    parameters.AddWithValue("@ImageURL", model.ImageURL ?? (object)DBNull.Value);
                    parameters.AddWithValue("@Email", model.Email);
                    parameters.AddWithValue("@GoogleId", model.GoogleId);
                }
            );
        }

        public void Delete(int id)
        {
            dataProvider.ExecuteProcedure(
                "Users_Delete",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                }
            );
        }
    }
}