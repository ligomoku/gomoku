﻿using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Enums;
using GomokuServer.Core.Games.Validation;

namespace GomokuServer.Core.Games.Results;

public record GameTilePlacementResult
{
	public bool IsValid { get; init; }

	public TileColor? PlacedTileColor { get; init; }

	public TilePlacementValidationError? ValidationError { get; init; }

	public Player? Winner { get; init; }

	public List<Tile>? WinningSequence { get; init; }
}