namespace GomokuServer.Application.Interfaces.Common;

public interface ICommand<TResponse> : IRequest<Result<TResponse>>;
