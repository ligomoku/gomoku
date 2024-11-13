namespace GomokuServer.Api.Hubs.Messages.Client;

[TranspilationSource]
public record ReceiveInvitationToPlayMessage
{
	public required string InvitationFromPlayerId { get; set; }

	public required string InvitationFromUserName { get; set; }
}
