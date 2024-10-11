using System.Reflection;

using Microsoft.Extensions.Logging;

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
			_logger.LogError(ex.Message, ex);

			if (typeof(TResponse).IsGenericType && typeof(TResponse).GetGenericTypeDefinition() == typeof(Result<>))
			{
				var resultContructor = typeof(TResponse).GetConstructor(
					BindingFlags.NonPublic | BindingFlags.CreateInstance | BindingFlags.Instance,
					null,
					[typeof(ResultStatus)],
					null);

				return (TResponse)resultContructor!.Invoke(new object[] { ResultStatus.Error });
			}

			if (typeof(TResponse) == typeof(Result))
			{
				return (TResponse)(object)Result.Error();
			}

			throw;
		}
	}
}
