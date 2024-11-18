using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Core.Games.Results;

public record AddPlayerActionResult : GameActionResult
{
	public Game? CreatedGame { get; init; }
}
