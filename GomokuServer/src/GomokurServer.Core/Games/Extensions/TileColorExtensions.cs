using GomokuServer.Core.Games.Enums;

namespace GomokuServer.Core.Games.Extensions;

public static class TileColorExtensions
{
	public static string GetString(this TileColor color)
	{
		return color switch
		{
			TileColor.Black => "black",
			TileColor.White => "white"
		};
	}

	public static char GetChar(this TileColor color)
	{
		return color switch
		{
			TileColor.Black => 'b',
			TileColor.White => 'w'
		};
	}
}
