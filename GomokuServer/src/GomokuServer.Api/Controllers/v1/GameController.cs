namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/[controller]")]
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
	/// <response code="200">Information about game </response>
	/// <response code="404">Game by id not found</response>
	[HttpGet("{gameId}")]
	[ProducesResponseType(typeof(GetGameResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public async Task<IActionResult> GetGameInfo([FromRoute] string gameId)
	{
		var getGameSessionResult = await _gameSessionHandler.GetAsync(gameId);

		return getGameSessionResult.ToApiResponse();
	}

	/// <summary>
	///	Get all games, which are available to join
	/// </summary>
	/// <response code="200">Returns list of games which are available to join</response>
	[HttpGet()]
	[Route("/api/games")]
	[ProducesResponseType(typeof(IEnumerable<GetAvailableGamesResponse>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetAvailableGames()
	{
		var getAvailableGames = await _gameSessionHandler.GetAvailableGamesAsync();

		return getAvailableGames.ToApiResponse();
	}

	/// <summary>
	/// Create new game
	/// </summary>
	/// <response code="200">Returns information about new created game</response>
	[HttpPost]
	[ProducesResponseType(typeof(CreateGameResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
	[SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(BadRequestErrorExample))]
	public async Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request)
	{
		var createGameResult = await _gameSessionHandler.CreateAsync(request.BoardSize);

		return createGameResult.ToApiResponse();
	}

	/// <summary>
	/// Join game
	/// </summary>
	/// <response code="200">Player with specified id successfully joined the game</response>
	/// <response code="404">Game or player with specified id not found</response>
	[HttpPost("{gameId}/join/{playerId}")]
	[ProducesResponseType(StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public async Task<IActionResult> AddPlayerToGame([FromRoute] string gameId, [FromRoute] string playerId)
	{
		var addPlayerToGameResult = await _gameSessionHandler.AddPlayerToGameAsync(gameId, playerId);

		return addPlayerToGameResult.ToApiResponse();
	}

	/// <summary>
	/// Make move in a game
	/// </summary>
	/// <response code="200">Move successfully made</response>
	/// <response code="400">Required data is not provided</response>
	/// <response code="404">Game or player with specified id not found</response>
	[HttpPost("{gameId}/make-move/{playerId}")]
	[ProducesResponseType(typeof(PlaceTileResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(BadRequestErrorExample))]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public async Task<IActionResult> MakeMove([FromRoute] string gameId, [FromRoute] string playerId, [FromBody] MakeMoveRequest request)
	{
		var placeTileResult = await _gameSessionHandler.PlaceTileAsync(gameId, new TileDto(request.X, request.Y), playerId);

		return placeTileResult.ToApiResponse();
	}
}
