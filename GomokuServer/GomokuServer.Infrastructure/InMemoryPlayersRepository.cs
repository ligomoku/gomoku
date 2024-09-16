
namespace GomokuServer.Infrastructure;

public class InMemoryPlayersRepository : IPlayersRepository
{
	private readonly List<Player> _players =
	[
		new Player("1"),
		new Player("2"),
		new Player("3"),
		new Player("4"),
		new Player("5"),
	];

	public Task<Result<Player>> GetAsync(string id)
	{
		var player = _players.Find(player =>  player.Id == id);

		if (player == null)
		{
			return Task.FromResult(Result<Player>.NotFound());
		}

		return Task.FromResult(Result.Success(player));
	}
}
