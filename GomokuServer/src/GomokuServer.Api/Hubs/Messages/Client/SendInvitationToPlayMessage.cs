namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public record SendInvitationToPlayMessage
{
	[Required]
	public required string PlayerId { get; init; }

	// TODO: Add time format and bords which user offers to play
}
