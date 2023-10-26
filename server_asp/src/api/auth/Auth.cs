namespace test.api;
using test.common;
public static class Auth
{
    public static RouteGroupBuilder GroupAuth(this RouteGroupBuilder group)
    {
        group.MapGet("/one", [Tags("Auth")] () =>
        {
            try
            {
                return new APIRes(200, "OK", new List<Object>() {
                    new {
                        id = 1,
                        name = "test",
                        age = 20,
                        address = "test"
                    },
                    new {
                        id = 2,
                        name = "test",
                        age = 20,
                        address = "test"
                    },
                    new {
                        id = 3,
                        name = "test",
                        age = 20,
                        address = "test"
                    },
                    new {
                        id = 4,
                        name = "test",
                        age = 20,
                        address = "test"
                    },
                    new {
                        id = 5,
                        name = "test",
                        age = 20,
                        address = "test"
                    }
                 });
            }
            catch (Exception e)
            {
                throw new Exception("test", e);

            }
        });
        return group;
    }

}