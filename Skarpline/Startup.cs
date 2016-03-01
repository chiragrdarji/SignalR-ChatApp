using Microsoft.Owin;
using Owin;
[assembly: OwinStartupAttribute(typeof(Skarpline.Startup))]

namespace Skarpline
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
            app.MapSignalR();
            

        }
    }
}
