using AutoMapper;
using POC_Project.Models;

namespace POC_Project.Mapper
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            CreateMap<ContactDto,ContactInfo >().ForMember(x => x.Id, opt => opt.Ignore()); ;
        }
    }
}
