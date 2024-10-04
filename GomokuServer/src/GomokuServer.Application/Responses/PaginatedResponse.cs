namespace GomokuServer.Application.Responses;

public record PaginatedResponse<T>
{
	[Required]
	public required T Data { get; init; }

	[Required]
	public required PaginationMetadata Metadata { get; init; }
}

public class PaginationMetadata
{
	[Required]
	public required bool HasMoreItems { get; init; }
}
