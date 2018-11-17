using ChatBSP.Models;
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

        public List<Message> GetChatByGroupId(int userId)
        {
            List<Message> results = new List<Message>();
            dataProvider.ExecuteProcedure(
                "Messages_GetByGroupId",
                inputParamMapper: parameters =>
                {
                    parameters.AddWithValue("@UserId", userId);
                },
                rowMapper: reader =>
                {
                    Message message = new Message();
                    message.GroupId = (int)reader["GroupId"];
                    results.Add(message);

                });
            return results;
        }
    }
}