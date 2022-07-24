using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class ProductParams
    {
        public string Sort { get; set; }
        public int? BrandId { get; set; }
        public int? ProductTypeId { get; set; }
        public int PageIndex { get; set; } = 1;
        private int maxPageSize = 50;
        private int pageSize = 6;
        public int PageSize
        {
            get
            {
                return this.pageSize;
            }
            set
            {
                this.pageSize = value > this.maxPageSize ? maxPageSize : value;
            }
        }
        private string _searchTerm;

        public string Search
        {
            get
            {
                return this._searchTerm;
            }
            set
            {
                this._searchTerm = value.ToLower();
            }
        }
    }
}
