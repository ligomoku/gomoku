using GomokuServer.Core;

namespace GomokuServer.Api.Controllers.v2;

[ApiController]
[ApiVersion("2.0")]
[Route("api/v2/[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
public class GameController : Controller
{
	private readonly IGameSessionHandler _gameSessionHandler;

	public GameController(IGameSessionHandler gameSessionHandler)
	{
		_gameSessionHandler = gameSessionHandler;
	}

	[HttpGet("{gameId}")]
	public async Task<IActionResult> GetGameInfo([FromRoute] string gameId)
	{
		var getGameSessionResult = await _gameSessionHandler.GetAsync(gameId);

		return getGameSessionResult.ToApiResponse();
	}

	[HttpPost]
	public async Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request)
	{
		var createGameResult = await _gameSessionHandler.CreateAsync(request.BoardSize);

		return createGameResult.ToApiResponse();
	}

	[HttpPost("{gameId}/join/{playerId}")]
	public async Task<IActionResult> AddPlayerToGame([FromRoute] string gameId, [FromRoute] string playerId)
	{
		var addPlayerToGameResult = await _gameSessionHandler.AddPlayerToGameAsync(gameId, playerId);

		return addPlayerToGameResult.ToApiResponse();
	}

	[HttpPost("{gameId}/make-move/{playerId}")]
	public async Task<IActionResult> MakeMove([FromRoute] string gameId, [FromRoute] string playerId, [FromBody] MakeMoveRequest request)
	{
		var placeTileResult = await _gameSessionHandler.PlaceTileAsync(gameId, new Tile(request.X, request.Y), playerId);

		return placeTileResult.ToApiResponse();
	}
}
