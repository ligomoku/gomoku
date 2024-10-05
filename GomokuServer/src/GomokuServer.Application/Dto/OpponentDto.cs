namespace GomokuServer.Application.Dto;

public record OpponentDto(string PlayerId, string UserName)
{
	[Required]
	public string PlayerId { get; } = PlayerId;

	[Required]
	public string UserName { get; } = UserName;
}
