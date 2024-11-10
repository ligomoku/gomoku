using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Enums;

namespace GomokuServer.Core.Profiles.Entities;

public record Profile(string Id, string UserName)
{
	public Player CreatePlayer(TileColor tileColor)
	{
		return new Player(Id, UserName, tileColor);
	}
};
