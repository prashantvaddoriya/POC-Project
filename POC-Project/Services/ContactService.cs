using Microsoft.EntityFrameworkCore;
using POC_Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using POC_Project.Repository;

namespace POC_Project.Services
{
    public class ContactService : IContactService
    {
        private readonly Repository.IContactRepository _contactRepository;
        public ContactService(Repository.IContactRepository contactRepository)
        {
            _contactRepository = contactRepository ??
                throw new ArgumentNullException(nameof(contactRepository));
        }
        public async Task<IEnumerable<ContactInfo>> GetContacts(int pageSize, int pageNumber)
        {

            return await _contactRepository.GetContacts(pageSize, pageNumber);
        }
        public async Task<ContactInfo> GetContactByID(int ID)
        {
            return await _contactRepository.GetContactByID(ID);
        }
        public async Task<ContactInfo> InsertContact(ContactInfo contactInfo)
        {
            return await _contactRepository.InsertContact(contactInfo);
        }
        public async Task<ContactInfo> UpdateContact(ContactInfo contactInfo)
        {
            return await  _contactRepository.UpdateContact(contactInfo);
        }
        public bool DeleteContact(int ID)
        {
            return _contactRepository.DeleteContact(ID);
        }
    }
}
