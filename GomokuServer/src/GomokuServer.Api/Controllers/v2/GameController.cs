using System.Net.Mime;

namespace GomokuServer.Api.Controllers.v2;

[ApiController]
[ApiVersion("2.0")]
[Route("api/v2/[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class GameController : Controller
{
	private readonly IGameSessionHandler _gameSessionHandler;

	public GameController(IGameSessionHandler gameSessionHandler)
	{
		_gameSessionHandler = gameSessionHandler;
	}

	/// <summary>
	/// Get information about game by game id
	/// </summary>
	/// <param name="gameId"></param>
	/// <returns></returns>
	[HttpGet("{gameId}")]
	[ProducesResponseType(typeof(Game), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetGameInfo([FromRoute] string gameId)
	{
		var getGameSessionResult = await _gameSessionHandler.GetAsync(gameId);

		return getGameSessionResult.ToApiResponse();
	}

	/// <summary>
	/// Get all games, which are available to join
	/// </summary>
	[HttpGet()]
	[Route("/api/v2/games")]
	[ProducesResponseType(typeof(IEnumerable<GetAvailableGamesResponse>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetAvailableGames()
	{
		var getAvailableGames = await _gameSessionHandler.GetAvailableGamesAsync();

		return getAvailableGames.ToApiResponse();
	}

	[HttpPost]
	[ProducesResponseType(typeof(CreateGameResponse), StatusCodes.Status200OK)]
	public async Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request)
	{
		var createGameResult = await _gameSessionHandler.CreateAsync(request.BoardSize);

		return createGameResult.ToApiResponse();
	}

	[HttpPost("{gameId}/join/{playerId}")]
	[ProducesResponseType(StatusCodes.Status200OK)]
	public async Task<IActionResult> AddPlayerToGame([FromRoute] string gameId, [FromRoute] string playerId)
	{
		var addPlayerToGameResult = await _gameSessionHandler.AddPlayerToGameAsync(gameId, playerId);

		return addPlayerToGameResult.ToApiResponse();
	}

	[HttpPost("{gameId}/make-move/{playerId}")]
	[ProducesResponseType(typeof(PlaceTileResponse), StatusCodes.Status200OK)]
	public async Task<IActionResult> MakeMove([FromRoute] string gameId, [FromRoute] string playerId, [FromBody] MakeMoveRequest request)
	{
		var placeTileResult = await _gameSessionHandler.PlaceTileAsync(gameId, new Tile(request.X, request.Y), playerId);

		return placeTileResult.ToApiResponse();
	}
}
