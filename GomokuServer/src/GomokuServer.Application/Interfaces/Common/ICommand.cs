namespace GomokuServer.Application.Interfaces.Common;

public interface ICommand : IRequest<Result>;

public interface ICommand<TResponse> : IRequest<Result<TResponse>>;
