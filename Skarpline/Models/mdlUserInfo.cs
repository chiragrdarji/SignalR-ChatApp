using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Skarpline.Models
{

    public class UsersContext : DbContext
    {
        public UsersContext()
            : base("SkarplineEE6Entities")
        {
        }

        public DbSet<mdlUserInfo> UserInfo { get; set; }
        public DbSet<mdlChats> Chats { get; set; }
        public DbSet<mdlConnectedUser> ConnectedUser { get; set; }
    }

    [Table("UserInfo")]
    public class mdlUserInfo
    {

        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }

        public string Name { get; set; }

        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        public DateTime CreatedOn { get; set; }




    }

    [Table("Chats")]
    public class mdlChats
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public long id { get; set; }
        public string SenderId { get; set; }
        public string ReciverId { get; set; }
        public string Msg { get; set; }

        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.None)]
        public DateTime OnCreated { get; set; }

    }

    [Table("ConnectedUser")]
    public class mdlConnectedUser
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string UserName { get; set; }

        public string ConnectionId { get; set; }



    }
}