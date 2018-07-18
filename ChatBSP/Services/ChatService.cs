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

        public string GetChatByGroupId(string userId)
        {
            List<Messages> results = new List<Messages>();
            dataProvider.ExecuteProcedure(
                "Messages_GetByGroupId",
                inputParamMapper: parameters =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                rowMapper: (reader) =>
                {
                    results.Append(reader.GetString(0));
                });
            return results;
        }
    }
}