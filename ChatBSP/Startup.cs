using System;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ChatBSP.Startup))]

namespace ChatBSP
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888

            // Do I need this?
            GlobalHost.DependencyResolver.Register(
                typeof(ChatHub),
                () => GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(ChatHub))
            );

            var hubConfiguration = new HubConfiguration();
            hubConfiguration.EnableDetailedErrors = true;
            app.MapSignalR(hubConfiguration);
        }
    }
}
