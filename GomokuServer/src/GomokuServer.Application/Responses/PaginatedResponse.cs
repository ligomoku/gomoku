namespace GomokuServer.Application.Responses;

public record PaginatedResponse<T>
{
	public required T Data { get; init; }

	public required PaginationMetadata Metadata { get; init; }
}

public class PaginationMetadata
{
	[Required]
	public required bool HasMoreItem { get; init; }
}
