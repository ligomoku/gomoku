namespace GomokuServer.Core.Entities;

public record Player(string Id, string UserName)
{
	public TileColor? Color { get; set; }
};
