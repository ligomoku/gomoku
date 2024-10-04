﻿namespace GomokuServer.Api.Hubs.Messages.Server;

public record PlayerMadeMoveMessage
{
	public required string PlayerId { get; init; }

	public required TileDto Tile { get; init; }

	public required string PlacedTileColor { get; init; }
}