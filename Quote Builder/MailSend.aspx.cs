using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;



public partial class MailSend : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            System.IO.File.WriteAllText(@"D:\test1.txt", Request.Form["body"]);
            if (Request.Form["mode"] == "mail")
            {
                System.IO.File.WriteAllText(@"D:\test.txt", "test");
                GmailSend(Request.Form["email"], Request.Form["body"], Request.Form["subject"], Request.Form["bcc"]);
                System.IO.File.WriteAllText(@"D:\test.txt", "test");
            }
        }
        catch (Exception ex)
        {

            System.IO.File.WriteAllText(@"D:\test1.txt", ex.Message);
        }

    }

    public void GmailSend(string email, string body, string subject, string bcc)
    {
        try
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
                {
                    // Credentials = new NetworkCredential("nimeshp.variance@gmail.com", "nimesh@123"),
                    Credentials = new NetworkCredential("bharat.variance@gmail.com", "variance12*"),
                    EnableSsl = true
                };

            var msg = new MailMessage("industrysafe@industrysafe.com", email, subject, body);

            var objbcc = bcc.Split(',');

            foreach (var item in objbcc)
            {
                msg.Bcc.Add(item);
            }

            msg.IsBodyHtml = true;

            client.Send(msg);
        }
        catch (Exception ex)
        {
            System.IO.File.WriteAllText(@"D:\test.txt", ex.Message);
            throw ex;
        }
    }

    private bool sendMail(string strEmail, string strSubj, string strBody, string strType, string strDays, string strPara)
    {
        bool functionReturnValue = false;
        string strEmailFrom = null;
        string strEmailServer = null;
        int strEmailServerPort = 0;
        XmlDocument xmlXML = default(XmlDocument);
        // an XML Container for the XML full document
        strEmailFrom = "industrysafe@industrysafe.com";
        strEmailServer = "email.industrysafe.com";
        strEmailServerPort = 25;
        System.Net.Mail.MailMessage mm = new System.Net.Mail.MailMessage();
        System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient();
        System.Net.Mail.MailAddress FromName = new System.Net.Mail.MailAddress(strEmailFrom);
        try
        {
            var _with1 = mm;
            _with1.IsBodyHtml = true;
            _with1.Subject = strSubj;
            _with1.To.Add(strEmail);
            _with1.From = FromName;
            _with1.Body = strBody;
        }
        catch (Exception ex)
        {
            // WriteToFile("ERROR catch 1101: " + ex.Message + ", " + strEmail);
        }
        smtp.Port = strEmailServerPort;
        smtp.Host = strEmailServer;
        functionReturnValue = false;
        try
        {
            smtp.Send(mm);
            functionReturnValue = true;
        }
        catch (Exception ex)
        {
            // WriteToFile("ERROR catch 1102: " + ex.Message + ", " + strEmail);
            functionReturnValue = false;
        }
        return functionReturnValue;
    }

    
    /// <summary>
    /// We are using this 
    /// </summary>
    /// <param name="subject"></param>
    /// <param name="email"></param>
    /// <param name="body"></param>
    /// <param name="bcc"></param>
    /// <returns></returns>
    [WebMethod]
    public static string SendmailAPI(string subject, string email, string body, string bcc)
    {

        try
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                //Credentials = new NetworkCredential("nimeshp.variance@gmail.com", "nimesh@123"),
                Credentials = new NetworkCredential("bharat.variance@gmail.com", "variance12*"),
                EnableSsl = true
            };

            var msg = new MailMessage("industrysafe@industrysafe.com", email, subject, body);

            var objbcc = bcc.Split(',');

            foreach (var item in objbcc)
            {
                msg.Bcc.Add(item);
            }

            msg.IsBodyHtml = true;

            client.Send(msg);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
        return "Success";

    }


   


}
