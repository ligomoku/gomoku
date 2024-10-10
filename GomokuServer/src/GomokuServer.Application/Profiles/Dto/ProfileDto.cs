namespace GomokuServer.Application.Profiles.Dto;

public record ProfileDto(string PlayerId, string UserName)
{
	[Required]
	public string PlayerId { get; } = PlayerId;

	[Required]
	public string UserName { get; } = UserName;
}
