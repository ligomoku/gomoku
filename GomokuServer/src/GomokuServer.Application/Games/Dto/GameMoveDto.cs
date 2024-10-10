namespace GomokuServer.Application.Games.Dto;

public record GameMoveDto
{
	[Required]
	public required TileDto Tile { get; init; }

	[Required]
	public required string PlayerId { get; init; }

	[Required]
	public required int MoveNumber { get; init; }
}
