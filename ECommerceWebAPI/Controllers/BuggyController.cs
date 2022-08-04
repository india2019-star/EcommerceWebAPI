using ECommerceWebAPI.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceWebAPI.Controllers
{
    public class BuggyController:BaseController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }
        [HttpGet("badrequest/{id}")]
        public ActionResult BadRequestError(int id)
        {
            return Ok();
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundResult()
        {
            var getitem = _context.Products.Find(100);
            if(getitem == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }

        [HttpGet("servererror")]
        
        public ActionResult GetServerError()
        {
            var getitem = _context.Products.Find(100);
            //if(getitem == null)
            //{
            //    return NotFound(new ApiResponse(500));
                var stringthing = getitem.ToString();
          //  }
            
            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult BadRequestError()
        {
            return BadRequest(new ApiResponse(400));
        }
    }
}
