// create api response with statusstatusCode, message, data object
using System.Text.Json.Serialization;

namespace shieldtify.common
{
    public class APIRes
    {
        public int statusCode { get; set; }
        public string message { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object? data { get; set; }
        public APIRes(int statusCode, string message)
        {
            this.statusCode = statusCode;
            this.message = message;
        }

        public APIRes(int statusCode, string message, object data)
        {
            this.statusCode = statusCode;
            this.message = message;
            this.data = data;
        }

    }
}
