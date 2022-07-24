using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceWebAPI.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode, string Message = null,string details = null) : base(statusCode, Message)
        {
            Details = details;
        }
        public string Details { get; set; }
    }
}
