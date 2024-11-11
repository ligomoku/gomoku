using GomokuServer.Core.Games.Extensions;

namespace GomokuServer.Application.Extensions;

public static class GameExtensions
{
	public static PlayersDto GetPlayersDto(this Game game)
	{
		var blackPlayer = game.Players.Black;
		var whitePlayer = game.Players.White;

		return new PlayersDto()
		{
			Black = new PlayerDto(blackPlayer.Id, blackPlayer.UserName, TileColor.Black.GetString()),
			White = new PlayerDto(whitePlayer.Id, whitePlayer.UserName, TileColor.White.GetString()),
		};
	}
}
