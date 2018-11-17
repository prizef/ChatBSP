using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using ChatBSP.Models;
using Microsoft.AspNet.SignalR;

namespace ChatBSP.Hubs
{
    public class ChatHub : Hub
    {
        readonly IChatService chatService;

        public ChatHub(IChatService chatService)
        {
            this.chatService = chatService;
        }

        static Dictionary<string, HashSet<string>> userIdToConnectionIds = new Dictionary<string, HashSet<string>>();

        public override Task OnConnected()
        {
            string userId = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;

            List<Message> message = chatService.GetChatByGroupId(Convert.ToInt32(userId));
            Clients.Caller.addNotification(message);

            lock (userIdToConnectionIds)
            {
                if (!userIdToConnectionIds.TryGetValue(userId, out HashSet<string> connections))
                {
                    connections = new HashSet<string>();
                    userIdToConnectionIds.Add(userId, connections);
                }
                connections.Add(connectionId);
            }

            return base.OnConnected();
        }
    }
}