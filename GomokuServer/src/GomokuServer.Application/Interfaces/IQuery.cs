namespace GomokuServer.Application.Interfaces;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>;
