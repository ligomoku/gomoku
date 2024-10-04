namespace GomokuServer.Core.Entities;

public record Players
{
	public Player? Black { get; set; }

	public Player? White { get; set; }
}
