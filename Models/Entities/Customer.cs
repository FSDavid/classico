using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Models.Entities
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }
        public string Location { get; set; }
        public string Locale { get; set; }
        public string Gender { get; set; }
    }
}
