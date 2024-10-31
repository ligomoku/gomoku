namespace GomokuServer.Core.Common.Results;

public abstract record CoreResult<T> where T : Enum
{
	public required bool IsValid { get; init; }

	public T? ValidationError { get; init; }
}
