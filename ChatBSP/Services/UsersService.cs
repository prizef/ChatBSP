using ChatBSP.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace ChatBSP.Services
{
    public class UsersService : IUsersService
    {
        private IDataProvider dataProvider;

        public UsersService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public bool GoogleLogin(GoogleLoginRequest model)
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
            string authEmail = gapiRespString["email"].Value<string>();
            string authAud = gapiRespString["aud"].Value<string>();
            string authFirstName = gapiRespString["given_name"].Value<string>();
            string authLastName = gapiRespString["family_name"].Value<string>();
            string authPassword = gapiRespString["sub"].Value<string>();

            if (authAud == googleClientId)
            {
                userAuthenticated = true;

                dataProvider.ExecuteProcedure(
                "Users_GoogleLogin",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Email", authEmail);
                    parameters.AddWithValue("@FirstName", authFirstName);
                    parameters.AddWithValue("@LastName", authLastName);
                    parameters.AddWithValue("@UserTypeId", (object)DBNull.Value);
                    parameters.AddWithValue("@Password", authPassword);
                },
                outputParamMapper: (reader) =>
                {
                    userId = (int)reader["Id"].Value;
                });

                UserAuthData userAuthData = new UserAuthData()
                {
                    Id = userId
                };
                authenticationService.LogIn(userAuthData, true);
            }
            return userAuthenticated;
        }
    }
}