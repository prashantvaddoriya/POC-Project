using Microsoft.EntityFrameworkCore;
using POC_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POC_Project.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly ContactManagementContext _contactManagementContext;
        public ContactRepository(ContactManagementContext contactManagementDbContext)
        {
            _contactManagementContext = contactManagementDbContext ??
                throw new ArgumentNullException(nameof(contactManagementDbContext));
        }
        public async Task<IEnumerable<ContactInfo>> GetContacts()
        {

            return await _contactManagementContext.ContactInfos.ToListAsync();
        }
        public async Task<ContactInfo> GetContactByID(int ID)
        {
            return await _contactManagementContext.ContactInfos.FindAsync(ID);
        }
        public async Task<ContactInfo> InsertContact(ContactInfo contactInfo)
        {
            _contactManagementContext.ContactInfos.Add(contactInfo);
            await _contactManagementContext.SaveChangesAsync();
            return contactInfo;
        }
        public async Task<ContactInfo> UpdateContact(ContactInfo contactInfo)
        {
            _contactManagementContext.Entry(contactInfo).State = EntityState.Modified;
            await _contactManagementContext.SaveChangesAsync();
            return contactInfo;
        }
        public bool DeleteContact(int ID)
        {
            bool result = false;
            var contactInfo = _contactManagementContext.ContactInfos.Find(ID);
            if (contactInfo != null)
            {
                _contactManagementContext.Entry(contactInfo).State = EntityState.Deleted;
                _contactManagementContext.SaveChanges();
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }
    }

}
