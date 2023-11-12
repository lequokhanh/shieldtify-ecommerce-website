using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.OpenApi.Models;
using shieldtify.api;
using shieldtify.middleware;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Shieldtify API", Version = "v1" });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin => true) // allow any origin 
            .AllowCredentials();
    });
});
builder.Services.AddHttpContextAccessor();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll"); // Add this line to enable CORS
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseMiddleware<AuthMiddleware>();
app.MapGroup("/api")
    .ApiV1();
// Add custom error handling middleware
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
        var exception = exceptionHandlerFeature != null ? exceptionHandlerFeature.Error : new Exception();

        var response = new
        {
            code = context.Response.StatusCode,
            message = exception.Message != null ? exception.Message : "An error occurred while processing your request"
        };

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    });
});

app.UseStatusCodePages(async context =>
{
    if (context.HttpContext.Response.StatusCode == StatusCodes.Status404NotFound)
    {
        context.HttpContext.Response.ContentType = "application/json";
        await context.HttpContext.Response.WriteAsync(JsonSerializer.Serialize(new
        {
            code = context.HttpContext.Response.StatusCode,
            message = "Not found"
        }));
    }
});

app.Run("http://localhost:4000");
