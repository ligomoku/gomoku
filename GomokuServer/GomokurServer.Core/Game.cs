namespace GomokuServer.Core;

public class Game
{
	public required string GameId { get; set; }

	public required GameBoard GameBoard { get; init; }

	public required Player PlayerOne { get; init; }

	public required Player PlayerTwo { get; init; }

	public string? WinnerId { get; set; }

	public TilePlacementResult PlaceTile(Tile tile, string playerId)
	{
		return GameBoard.PlaceTile(tile, playerId);
	}
}
