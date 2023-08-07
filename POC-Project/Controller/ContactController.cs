using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_Project.Models;
using POC_Project.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace POC_Project.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactRepository _contactService;
        private readonly IMapper _mapper;
        public ContactController(IContactRepository contactService , IMapper mapper)
        {
            _contactService = contactService ??
                throw new ArgumentNullException(nameof(contactService));
        }
        [HttpGet]
        [Route("GetContacts")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _contactService.GetContacts());
        }
        [HttpGet]
        [Route("GetContactByID/{Id}")]
        public async Task<IActionResult> GetContactByID(int Id)
        {
            return Ok(await _contactService.GetContactByID(Id));
        }
        [HttpPost]
        [Route("AddContact")]
        public async Task<IActionResult> Post(ContactDto contactInfo)
        {
            var contactInfo1 =  _mapper.Map<ContactInfo>(contactInfo);
            var result = await _contactService.InsertContact(contactInfo1);
            if (result.Id == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }
        [HttpPut]
        [Route("UpdateContact")]
        public async Task<IActionResult> Put(ContactInfo contactInfo)
        {
            await _contactService.UpdateContact(contactInfo);
            return Ok("Updated Successfully");
        }
        [HttpDelete]
        [Route("DeleteContact")]
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var result = _contactService.DeleteContact(id);
            return new JsonResult("Deleted Successfully");
        }

        
    }
}
