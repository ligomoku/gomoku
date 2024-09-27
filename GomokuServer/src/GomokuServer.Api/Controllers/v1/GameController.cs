using Microsoft.AspNetCore.SignalR;

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
	private readonly IHubContext<GameHub> _hubContext;

	public GameController(IGameSessionHandler gameSessionHandler, IHubContext<GameHub> hubContext)
	{
		_gameSessionHandler = gameSessionHandler;
		_hubContext = hubContext;
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
	/// Makes a move in the specified game and broadcasts the updated game state to all connected clients.
	/// </summary>
	/// <remarks>
	/// This endpoint allows a player to make a move in an ongoing game. Upon a successful move,
	/// the updated game state is broadcast to all connected clients in real-time using SignalR.
	/// </remarks>
	/// <param name="gameId">The ID of the game.</param>
	/// <param name="playerId">The ID of the player making the move.</param>
	/// <param name="request">The details of the move to be made.</param>
	/// <response code="200">Move successfully made and game state updated.</response>
	/// <response code="400">Invalid move or missing required data.</response>
	/// <response code="404">Game or player not found.</response>
	/// <response code="500">An internal server error occurred.</response>
	[HttpPost("{gameId}/make-move/{playerId}")]
	[ProducesResponseType(typeof(PlaceTileResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
	public async Task<IActionResult> MakeMove(
		[FromRoute] string gameId,
		[FromRoute] string playerId,
		[FromBody] MakeMoveRequest request)
	{
		var placeTileResult = await _gameSessionHandler.PlaceTileAsync(
			gameId,
			new TileDto(request.X, request.Y),
			playerId);

		if (placeTileResult.IsSuccess)
		{
			// Broadcast the updated game state
			await _hubContext.Clients.All.SendAsync("GameUpdate", placeTileResult.Value);
		}

		return placeTileResult.ToApiResponse();
	}
}
