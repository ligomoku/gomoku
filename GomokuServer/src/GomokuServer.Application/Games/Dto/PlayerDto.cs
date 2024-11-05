namespace GomokuServer.Application.Games.Dto;

[TranspilationSource]
public record PlayerDto(string PlayerId, string UserName, string Color)
{
	[Required]
	public string PlayerId { get; } = PlayerId;

	[Required]
	public string UserName { get; } = UserName;

	[Required]
	public string Color { get; } = Color;
}
