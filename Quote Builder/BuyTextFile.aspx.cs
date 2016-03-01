using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class BuyTextFile : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod]
    public static string generateTextFileForBuy(string data)
    {
        try
        {
            string path = System.Configuration.ConfigurationManager.AppSettings["filepath"];
            string fileName = System.Configuration.ConfigurationManager.AppSettings["filename"];
            DirectoryInfo d = new DirectoryInfo(path);
            FileInfo[] Files = d.GetFiles("*.txt").Where(p => p.Name.Contains(fileName)).ToArray();
            if (Files == null || Files.Count() == 0)
            {
                path = path + fileName + ".txt";
            }
            else
            {
                int fcount = 0;
                foreach (var item in Files)
                {
                    string Sname = item.Name.Replace(fileName, "").Replace(".txt", "");
                    if (!string.IsNullOrEmpty(Sname))
                        fcount = Convert.ToInt32(Sname);
                }
                path = path + fileName + (fcount + 1) + ".txt";

            }

            TextWriter tw = new StreamWriter(path, true);
            var text = data.Replace("\n", System.Environment.NewLine);

            tw.WriteLine(text);
            tw.Close();

            return path;
        }
        catch (Exception ex)
        {
            return ex.Message;
        }

    }

}
