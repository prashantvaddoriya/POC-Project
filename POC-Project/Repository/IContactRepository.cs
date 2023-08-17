using Microsoft.EntityFrameworkCore;
using POC_Project.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace POC_Project.Repository
{
    public interface IContactRepository
    {
        public Task<IEnumerable<ContactInfo>> GetContacts(int pageSize, int pageNumber);
        public Task<ContactInfo> GetContactByID(int ID);
        public Task<ContactInfo> InsertContact(ContactInfo contactInfo);
        public Task<ContactInfo> UpdateContact(ContactInfo contactInfo);
        public bool DeleteContact(int ID);
    }
}
