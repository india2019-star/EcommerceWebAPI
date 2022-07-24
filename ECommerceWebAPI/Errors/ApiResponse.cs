using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceWebAPI.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public ApiResponse(int statusCode,string Message = null)
        {
            this.StatusCode = statusCode;
            this.Message = Message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            switch(statusCode)
            {
                case 400:
                    return "A Bad Request";

                case 401:
                    return "Not Authorized To Access";
                  
                case 404:
                    return "Resource Not Found";
                
                case 500:
                    return "Server Error";
                    
                default:
                    return "Oops Error!!!";
             
            }

        }
    }
}
