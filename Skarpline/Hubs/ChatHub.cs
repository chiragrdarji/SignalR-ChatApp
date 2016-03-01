using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Skarpline.Models;
namespace Skarpline.Hubs
{
    public class ChatHub : Hub
    {

        public void Send(string name, string message)
        {
            // Call the addNewMessageToPage method to update clients.
            Clients.All.addNewMessageToPage(name, message);
        }

       /// <summary>
       /// This method is called when user start typing in group chat
       /// </summary>
       /// <param name="userName"></param>
       /// <param name="message"></param>
        public void IsTyping(string userName,string message)
        {
            SayWhoIsTyping(userName, message); //call the function to send the html to the other clients
        }

        /// <summary>
        /// This method send typed messsage back to greoup window for each client
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="message"></param>
        public void SayWhoIsTyping(string userName,string message)
        {
            var id = Context.ConnectionId;
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            context.Clients.All.sayWhoIsTyping(userName,message, id);
        }

        /// <summary>
        /// This method is called when user start typing in private chat window.
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="message"></param>
        public void IsTypingPrivate(string userName, string message)
        {
            SayWhoIsTypingPrivate(userName,message);
        }

        /// <summary>
        /// This method send typed content to private chat window.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="message"></param>
        public void SayWhoIsTypingPrivate(string username, string message)
        {
            var id = Context.ConnectionId;
            IHubContext context = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            context.Clients.All.sayWhoIsTypingPrivate(username, message, id);
        }

        /// <summary>
        /// When new user logs in, he will be added to chat room and all other users are informed amount new user
        /// </summary>
        /// <param name="username"></param>
        public void Connect(string username)
        {
            var id = Context.ConnectionId;

            using (var dbContext = new UsersContext())
            {
                if (dbContext.ConnectedUser.Count(x => x.ConnectionId == id) == 0)
                {
                    dbContext.ConnectedUser.Add(new mdlConnectedUser() { ConnectionId = id, UserName = username });

                    dbContext.SaveChanges();

                    // send to caller
                    Clients.Caller.onConnected(id, username, dbContext.ConnectedUser, dbContext.Chats);

                    // send to all except caller
                    Clients.AllExcept(id).onNewUserConnected(id, username);
                }
            }

        }

        /// <summary>
        /// Broadcast message to chat room/everyone
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="message"></param>
        public void SendMessageToAll(string userName, string message)
        {
            // store last 20 messages in cache
            AddMessageinCache(userName, message, "");

            // Broad cast message
            Clients.All.messageReceived(userName, message);
        }

        /// <summary>
        /// Send message to private chat window
        /// </summary>
        /// <param name="toUserId"></param>
        /// <param name="message"></param>
        public void SendPrivateMessage(string toUserId, string message)
        {

            string fromUserId = Context.ConnectionId;

            using (var dbContext = new UsersContext())
            {
                var toUser = dbContext.ConnectedUser.FirstOrDefault(x => x.ConnectionId == toUserId);
                var fromUser = dbContext.ConnectedUser.FirstOrDefault(x => x.ConnectionId == fromUserId);

                if (toUser != null && fromUser != null)
                {

                    // send to 
                    Clients.Client(toUserId).sendPrivateMessage(fromUserId, fromUser.UserName, message, dbContext.Chats.Where(t => (t.SenderId == fromUser.UserName && t.ReciverId == toUser.UserName) || (t.SenderId == toUser.UserName && t.ReciverId == fromUser.UserName)));

                    // send to caller user
                    Clients.Caller.sendPrivateMessage(toUserId, fromUser.UserName, message, dbContext.Chats.Where(t => (t.SenderId == fromUser.UserName && t.ReciverId == toUser.UserName) || (t.SenderId == toUser.UserName && t.ReciverId == fromUser.UserName)));
                }

                AddMessageinCache(toUser.UserName, message, fromUser.UserName);
            }
        }


        /// <summary>
        /// Remove user from online user list and incform other users that someone has logged off or disconnected.
        /// </summary>
        /// <returns></returns>
        public override System.Threading.Tasks.Task OnDisconnected()
        {
            using (var dbContext = new UsersContext())
            {
                var item = dbContext.ConnectedUser.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
                if (item != null)
                {
                    dbContext.ConnectedUser.Remove(item);
                    dbContext.SaveChanges();

                    var id = Context.ConnectionId;
                    Clients.All.onUserDisconnected(id, item.UserName);

                }
            }
            return base.OnDisconnected();
        }

        /// <summary>
        /// Add message to database
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="message"></param>
        /// <param name="Reciver"></param>

        private void AddMessageinCache(string userName, string message, string Reciver)
        {
            using (var dbContext = new UsersContext())
            {
                dbContext.Chats.Add(new mdlChats { SenderId = userName, ReciverId = Reciver, Msg = message, OnCreated = DateTime.Now });
                dbContext.SaveChanges();
                if (dbContext.Chats.Count(x => x.ReciverId == "") > 20)
                {
                    var history = dbContext.Chats.SingleOrDefault(x => x.ReciverId == "");
                    dbContext.Chats.Remove(history);
                }
            }
        }


    }
}