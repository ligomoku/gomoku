namespace GomokuServer.Application.Common.Interfaces;

public interface IPaginatedQuery<TResponse> : IQuery<TResponse>
{
	int Limit { get; init; }

	int Offset { get; init; }
}
