namespace GomokuServer.Application.Interfaces.Common;

public interface ICommandHandler<TRequest, TResponse> : IRequestHandler<TRequest, Result<TResponse>>
	where TRequest : ICommand<TResponse>;
