using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace ChatBSP.Services
{
    public class ChatService : IChatService
    {
        private IDataProvider dataProvider;

        public ChatService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public string GetChatByUserId(string userId)
        {
            var jsonResult = new StringBuilder();
            dataProvider.ExecuteProcedure(
                "Notifications_GetByUserId",
                inputParamMapper: parameters =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                rowMapper: (reader) =>
                {
                    jsonResult.Append(reader.GetString(0));
                });
            return jsonResult.ToString();
        }
    }
}