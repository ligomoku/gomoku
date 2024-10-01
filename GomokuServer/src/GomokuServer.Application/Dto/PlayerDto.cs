namespace GomokuServer.Application.Dto;

public record PlayerDto(string PlayerId, string UserName, string? Color)
{
	[Required]
	public string PlayerId { get; } = PlayerId;

	[Required]
	public string UserName { get; } = UserName;

	public string? Color { get; } = Color;
}
