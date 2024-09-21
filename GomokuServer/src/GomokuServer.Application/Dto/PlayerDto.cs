namespace GomokuServer.Application.Dto;

public record PlayerDto(string PlayerId)
{
	[Required]
	public string PlayerId { get; } = PlayerId;
}
