using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Skarpline.Models;
namespace Skarpline.Controllers
{
 
    public class HomeController : Controller
    {
        public ActionResult ChatDemo()
        {
            var dbContext = new UsersContext();
            var count = dbContext.ConnectedUser.Count();
            ViewBag.onlineUser = count;


            return View();
        }




    }
}