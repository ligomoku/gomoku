using GomokuServer.Api.Swagger.Examples;
using GomokuServer.Application.Common.Responses;
using GomokuServer.Application.Games.Responses;

using Microsoft.AspNetCore.Authorization;

namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class GameController : Controller
{
	private readonly IMediator _mediator;
	private readonly IHubContext<GameHub> _gameHubContext;

	public GameController(IMediator mediator, IHubContext<GameHub> gameHubContext)
	{
		_mediator = mediator;
		_gameHubContext = gameHubContext;
	}

	/// <summary>
	/// Get game history by game id
	/// </summary>
	/// <response code="200">Information about game </response>
	/// <response code="404">Game by id not found</response>
	[HttpGet("{gameId}/history")]
	[ProducesResponseType(typeof(GetGameHistoryResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public async Task<IActionResult> GetGameHistory([FromRoute] string gameId)
	{
		var getGameSessionResult = await _mediator.Send(new GetGameHistoryQuery { GameId = gameId });
		return getGameSessionResult.ToApiResponse();
	}

	/// <summary>
	/// Get all games available to join
	/// </summary>
	/// <response code="200">Returns list of games that are available to join</response>
	[HttpGet]
	[Route("/api/games/available-to-join")]
	[ProducesResponseType(typeof(PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetAvailableGames([FromQuery] GetAvailableGamesRequest request)
	{
		var availableGamesResult = request.IsAnonymous
			? await _mediator.Send(new GetAvailableToJoinAnonymousGamesQuery() { Limit = request.Limit!.Value, Offset = request.Offset!.Value })
			: await _mediator.Send(new GetAvailableToJoinRegisteredGamesQuery() { Limit = request.Limit!.Value, Offset = request.Offset!.Value });

		return availableGamesResult.ToApiResponse();
	}

	/// <summary>
	/// Get all active games
	/// </summary>
	/// <response code="200">Returns list of active games</response>
	[HttpGet]
	[Route("/api/games/active")]
	[ProducesResponseType(typeof(PaginatedResponse<IEnumerable<GetActiveGamesResponse>>), StatusCodes.Status200OK)]
	public async Task<IActionResult> GetActiveGames([FromQuery] GetActiveGamesRequest request)
	{
		var activeGamesResult = request.IsAnonymous
			? await _mediator.Send(new GetActiveAnonymousGamesQuery() { Limit = request.Limit!.Value, Offset = request.Offset!.Value })
			: await _mediator.Send(new GetActiveRegisteredGamesQuery() { Limit = request.Limit!.Value, Offset = request.Offset!.Value });

		return activeGamesResult.ToApiResponse();
	}

	/// <summary>
	/// Create new game (supports both anonymous and authenticated users)
	/// </summary>
	/// <response code="200">Returns information about newly created game</response>
	[HttpPost]
	[AllowAnonymous]
	[ProducesResponseType(typeof(CreateGameResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
	[SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(BadRequestErrorExample))]
	public async Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request)
	{
		var playerId = User.Claims.Get(JwtClaims.UserId);

		var createGameResult = playerId == null
			? await _mediator.Send(new CreateAnonymousGameCommand() { BoardSize = request.BoardSize, TimeControl = request.TimeControl })
			: await _mediator.Send(new CreateRegisteredGameCommand() { BoardSize = request.BoardSize, TimeControl = request.TimeControl, PlayerId = playerId });

		return createGameResult.ToApiResponse();
	}

	/// <summary>
	/// Join game (supports both anonymous and authenticated users)
	/// </summary>
	/// <response code="200">Player with specified id successfully joined the game</response>
	/// <response code="404">Game or player with specified id not found</response>
	[HttpPost("{gameId}/join")]
	[AllowAnonymous]
	[ProducesResponseType(typeof(AddPlayerToGameResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public async Task<IActionResult> AddPlayerToGame([FromRoute] string gameId)
	{
		var playerId = User.Claims.Get(JwtClaims.UserId);

		var addPlayerToGameResult = playerId == null
			? await _mediator.Send(new AddAnonymousPlayerToGameCommand() { GameId = gameId })
			: await _mediator.Send(new AddRegisteredPlayerToGameCommand() { GameId = gameId, PlayerId = playerId });

		if (addPlayerToGameResult.IsSuccess)
		{
			var message = new PlayerJoinedGameMessage { UserId = addPlayerToGameResult.Value.PlayerId };
			await _gameHubContext.Clients.Group(gameId).SendAsync(GameHubMethod.PlayerJoinedGame, message);
		}

		return addPlayerToGameResult.ToApiResponse();
	}
}
