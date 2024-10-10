using Tapper;

namespace GomokuServer.Application.Games.Dto;

[TranspilationSource]
public record TileDto(int X, int Y)
{
	[Required]
	public int X { get; } = X;

	[Required]
	public int Y { get; } = Y;
}
