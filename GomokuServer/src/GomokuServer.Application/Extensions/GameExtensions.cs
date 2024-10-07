using GomokuServer.Core.Extensions;

namespace GomokuServer.Application.Extensions;

public static class GameExtensions
{
	public static PlayersDto GetPlayersDto(this Game game)
	{
		var blackPlayer = game.Players.Black;
		var whitePlayer = game.Players.White;

		return new PlayersDto()
		{
			Black = blackPlayer != null ? new PlayerDto(blackPlayer.Id, blackPlayer.UserName, TileColor.Black.GetString()) : null,
			White = whitePlayer != null ? new PlayerDto(whitePlayer.Id, whitePlayer.UserName, TileColor.White.GetString()) : null,
		};
	}
}
