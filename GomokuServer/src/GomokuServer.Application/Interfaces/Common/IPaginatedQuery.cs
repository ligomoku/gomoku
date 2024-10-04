namespace GomokuServer.Application.Interfaces.Common;

public interface IPaginatedQuery<TResponse> : IQuery<TResponse>
{
	int Limit { get; init; }

	int Offset { get; init; }
}
