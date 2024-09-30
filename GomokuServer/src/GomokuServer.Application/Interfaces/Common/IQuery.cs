namespace GomokuServer.Application.Interfaces.Common;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>;
