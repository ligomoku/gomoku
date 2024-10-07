using GomokuServer.Core.Entities;

namespace GomokuServer.Core.Extensions;

public static class EnumsExtensions
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
