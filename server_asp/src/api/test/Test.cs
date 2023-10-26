namespace test.api;
public static class Test
{
    [Tags("Test")]
    public static RouteGroupBuilder GroupTest(this RouteGroupBuilder group)
    {
        group.MapGet("/one", () =>
        {
            try
            {
                var result = new
                {
                    message = "Hello World!"
                };
                return Results.Ok(result);
            }
            catch (Exception e)
            {
                throw new Exception("test", e);

            }
        });
        return group;
    }

}