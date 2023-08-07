using System;
using System.Collections.Generic;

#nullable disable

namespace POC_Project.Models
{
    public partial class ContactInfo
    {
        public int Id { get; set; }
        public string ContactName { get; set; }
        public string Email { get; set; }   
        public string Mobile { get; set; }
        public byte[] Image { get; set; }
        public string Company { get; set; }
        public string Hobby { get; set; }
        public string Address { get; set; }
    }
}
