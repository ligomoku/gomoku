namespace GomokuServer.Api.Hubs.Messages.Client;

using System.ComponentModel.DataAnnotations;

using Tapper;

[TranspilationSource]
public record ChatMessageClientMessage
{
	[Required] public required string GameId { get; init; }
	[Required] public required string User { get; init; }
	[Required] public required string Message { get; init; }
}
