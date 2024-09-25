using Microsoft.AspNetCore.Mvc;
using ShoeTracker.Server.Exception;

namespace ShoeTracker.Server.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (BadInputException ex)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync(ex.Message);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, $"Exception: {ex.Message}");
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            }
        }
    }
}
