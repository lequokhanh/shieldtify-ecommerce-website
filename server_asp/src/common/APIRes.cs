// create api response with statuscode, message, data object
using System.Text.Json.Serialization;

namespace test.common
{
    public class APIRes
    {
        public int code { get; set; }
        public string message { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object? data { get; set; }
        public APIRes(int code, string message)
        {
            this.code = code;
            this.message = message;
        }

        public APIRes(int code, string message, object data)
        {
            this.code = code;
            this.message = message;
            this.data = data;
        }

    }
}
