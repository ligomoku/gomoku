using GomokuServer.Api.Hubs.Messages.Server;
using GomokuServer.Api.Swagger.Examples;

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
	/// Create new game (supports both anonymous and authenticated users)
	/// </summary>
	/// <response code="200">Returns information about new created game</response>
	[HttpPost]
	[ProducesResponseType(typeof(CreateGameResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
	[SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(BadRequestErrorExample))]
	public async Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request)
	{
		// Get userId and userName from claims (nullable)
		string? userId = User.Claims.Get(JwtClaims.UserId);
		string? userName = User.Claims.Get(JwtClaims.UserName);

		if (string.IsNullOrEmpty(userId))
		{
			userId = Guid.NewGuid().ToString();
			userName = $"Guest_{userId.Substring(0, 6)}";
		}

		var createGameResult = await _mediator.Send(new CreateGameCommand()
		{
			BoardSize = request.BoardSize,
			PlayerId = userId
		});

		if (createGameResult.IsSuccess)
		{
			var response = new CreateGameResponse(
				createGameResult.Value.GameId,
				request.BoardSize
			);
			return Ok(response);
		}
		else
		{
			return BadRequest("Game creation failed");
		}
	}

	/// <summary>
	/// Join game (supports both anonymous and authenticated users)
	/// </summary>
	/// <response code="204">Player with specified id successfully joined the game</response>
	/// <response code="404">Game or player with specified id not found</response>
	[HttpPost("{gameId}/join")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public async Task<IActionResult> AddPlayerToGame([FromRoute] string gameId)
	{
		string? userId = User.Claims.Get(JwtClaims.UserId);
		string? userName = User.Claims.Get(JwtClaims.UserName);

		if (string.IsNullOrEmpty(userId))
		{
			userId = Guid.NewGuid().ToString();
			userName = $"Guest_{userId.Substring(0, 6)}";
		}

		var addPlayerToGameResult = await _mediator.Send(new AddPlayerToGameCommand()
		{
			GameId = gameId,
			PlayerId = userId
		});

		if (addPlayerToGameResult.IsSuccess)
		{
			var message = new PlayerJoinedGameMessage()
			{
				UserName = userName!
			};
			await _gameHubContext.Clients.Group(gameId).SendAsync(GameHubMethod.PlayerJoinedGame, message);
			return NoContent();
		}
		else
		{
			return NotFound("Game or player not found");
		}
	}
}
