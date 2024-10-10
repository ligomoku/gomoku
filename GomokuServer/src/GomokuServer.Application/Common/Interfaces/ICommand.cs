namespace GomokuServer.Application.Common.Interfaces;

public interface ICommand : IRequest<Result>;

public interface ICommand<TResponse> : IRequest<Result<TResponse>>;
