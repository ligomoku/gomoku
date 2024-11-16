using GomokuServer.Api.Swagger.Examples;
using GomokuServer.Application.Common.Responses;
using GomokuServer.Application.Games.Responses;

using Microsoft.AspNetCore.Authorization;

namespace GomokuServer.Api.Controllers.v1;

[Route("api/game/registered")]
public class RegisteredGamesController : GameController
{
	private readonly IMediator _mediator;
	private readonly IHubContext<RegisteredGameHub> _hubContext;

	public RegisteredGamesController(IMediator mediator, IHubContext<RegisteredGameHub> hubContext)
	{
		_mediator = mediator;
		_hubContext = hubContext;
	}

	[Authorize]
	[ProducesResponseType(typeof(GetGameHistoryResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public override async Task<IActionResult> GetGameHistory([FromRoute] string gameId)
	{
		var getRegisteredGameHistoryResult = await _mediator.Send(new GetRegisteredGameHistoryQuery { GameId = gameId });
		return getRegisteredGameHistoryResult.ToApiResponse();
	}

	[Authorize]
	[ProducesResponseType(typeof(PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>), StatusCodes.Status200OK)]
	public override async Task<IActionResult> GetAvailableGames([FromQuery] PaginationRequest request)
	{
		var availableGamesResult = await _mediator.Send(new GetAvailableToJoinRegisteredGamesQuery() { Limit = request.Limit!.Value, Offset = request.Offset!.Value });
		return availableGamesResult.ToApiResponse();
	}

	[Authorize]
	[ProducesResponseType(typeof(PaginatedResponse<IEnumerable<GetActiveGamesResponse>>), StatusCodes.Status200OK)]
	public override async Task<IActionResult> GetActiveGames([FromQuery] PaginationRequest request)
	{
		var activeGamesResult = await _mediator.Send(new GetActiveRegisteredGamesQuery() { Limit = request.Limit!.Value, Offset = request.Offset!.Value });
		return activeGamesResult.ToApiResponse();
	}

	[Authorize]
	[ProducesResponseType(typeof(CreateGameResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
	[SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(BadRequestErrorExample))]
	public override async Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request)
	{
		var playerId = User.Claims.Get(JwtClaims.UserId);
		var createGameResult = await _mediator.Send(new CreateRegisteredGameCommand() { BoardSize = request.BoardSize, TimeControl = request.TimeControl, PlayerId = playerId! });
		return createGameResult.ToApiResponse();
	}

	/// <summary>
	/// Join game   
	/// </summary>
	/// <response code="200">Player with specified id successfully joined the game</response>
	/// <response code="404">Game or player with specified id not found</response>
	[HttpPost("{gameId}/join")]
	[ProducesResponseType(typeof(AddPlayerToGameResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	[Authorize]
	public async Task<IActionResult> AddPlayerToGame([FromRoute] string gameId)
	{
		var playerId = User.Claims.Get(JwtClaims.UserId);
		var addPlayerToGameResult = await _mediator.Send(new AddRegisteredPlayerToGameCommand() { GameId = gameId, PlayerId = playerId! });

		if (addPlayerToGameResult.IsSuccess)
		{
			var message = new PlayerJoinedGameMessage { UserId = addPlayerToGameResult.Value.PlayerId };
			await _hubContext.Clients.Group(gameId).SendAsync(GameHubMethod.PlayerJoinedGame, message);
		}

		return addPlayerToGameResult.ToApiResponse();
	}
}
