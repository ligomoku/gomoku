using System.Reflection;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace GomokuServer.Application.Common.Pipelines;

public class ExceptionHandlingPipeline<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : class
    where TResponse : class, IResult
{
    private readonly ILogger<ExceptionHandlingPipeline<TRequest, TResponse>> _logger;

    public ExceptionHandlingPipeline(ILogger<ExceptionHandlingPipeline<TRequest, TResponse>> logger)
    {
        _logger = logger;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        try
        {
            return await next();
        }
        catch (Exception ex)
        {
	        var requestType = typeof(TRequest).Name;

            var stackTrace = new StackTrace(ex, true);
            var frame = stackTrace.GetFrames()?.FirstOrDefault(f => f.GetFileLineNumber() > 0);

            var fileName = frame?.GetFileName() ?? "Unknown File";
            var lineNumber = frame?.GetFileLineNumber() ?? 0;
            var methodName = frame?.GetMethod()?.Name ?? "Unknown Method";

            _logger.LogError(ex,
                "Exception caught in {PipelineName} while handling {RequestType}: {Message}. \n" +
                "Occurred in {FileName} at line {LineNumber}, method {MethodName}. \nStackTrace: {StackTrace}",
                nameof(ExceptionHandlingPipeline<TRequest, TResponse>),
                requestType,
                ex.Message,
                fileName,
                lineNumber,
                methodName,
                ex.StackTrace
            );

            if (typeof(TResponse).IsGenericType && typeof(TResponse).GetGenericTypeDefinition() == typeof(Result<>))
            {
                var resultConstructor = typeof(TResponse).GetConstructor(
                    BindingFlags.NonPublic | BindingFlags.CreateInstance | BindingFlags.Instance,
                    null,
                    new[] { typeof(ResultStatus) },
                    null);

                return (TResponse)resultConstructor!.Invoke(new object[] { ResultStatus.Error });
            }

            if (typeof(TResponse) == typeof(Result))
            {
                return (TResponse)(object)Result.Error();
            }

            throw;
        }
    }
}
