namespace GomokuServer.Application.Common.Interfaces;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>;
