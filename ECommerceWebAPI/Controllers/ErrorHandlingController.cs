using ECommerceWebAPI.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceWebAPI.Controllers
{
    [Route("errors/{0}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    //[ApiController]
    public class ErrorHandlingController : BaseController
    {
        public IActionResult GetErrors(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
