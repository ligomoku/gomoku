namespace GomokuServer.Api.Hubs.Messages.Client;

public record MakeMoveClientMessage
{
	[Required]
	public required string GameId { get; init; }

	[Required]
	public required int X { get; init; }

	[Required]
	public required int Y { get; init; }
}
