namespace GomokuServer.Application.Interfaces.Common;
public interface IQueryHandler<TRequest, TResponse> : IRequestHandler<TRequest, Result<TResponse>>
	where TRequest : IQuery<TResponse>;
