using GomokuServer.Core.Common.Results;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Results;

public record BoardTilePlacementResult : CoreResult<TilePlacementValidationError>
{
	public List<Tile>? WinningSequence { get; init; }

	public bool IsTieSituationAfterMove { get; init; }
}
