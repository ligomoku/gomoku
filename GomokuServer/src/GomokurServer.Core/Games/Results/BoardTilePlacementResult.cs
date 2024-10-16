﻿using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Validation;

namespace GomokuServer.Core.Games.Results;

public class BoardTilePlacementResult
{
	public required bool IsValid { get; init; }

	public TilePlacementValidationError? ValidationError { get; init; }

	public List<Tile>? WinningSequence { get; init; }

	public bool IsTieSituationAfterMove { get; init; }
}
