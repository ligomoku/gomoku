﻿using GomokuServer.Core.Games.Entities;

namespace GomokuServer.Core.Games.Results;

public record CreateGameResult : GameActionResult
{
	public Game? CreatedGame { get; init; }
};
