using GomokuServer.Api.Swagger.Examples;
using GomokuServer.Application.Games.Responses;

using Microsoft.AspNetCore.Authorization;

namespace GomokuServer.Api.Controllers.v1;

[Route("api/game/anonymous")]
public class AnonymousGamesController : GameControllerBase
{
	private readonly IMediator _mediator;
	private readonly IHubContext<AnonymousGameHub> _hubContext;

	public AnonymousGamesController(IMediator mediator, IHubContext<AnonymousGameHub> hubContext)
	{
		_mediator = mediator;
		_hubContext = hubContext;
	}

	[AllowAnonymous]
	public override async Task<IActionResult> GetGameHistory([FromRoute] string gameId)
	{
		var getRegisteredGameHistoryResult = await _mediator.Send(new GetAnonymousGameHistoryQuery { GameId = gameId });
		return getRegisteredGameHistoryResult.ToApiResponse();
	}

	[AllowAnonymous]
	public override async Task<IActionResult> GetAvailableGames([FromQuery] GetAvailableGamesRequest request)
	{
		var availableGamesResult = await _mediator.Send(new GetAvailableToJoinAnonymousGamesQuery() { Limit = request.Limit!.Value, Offset = request.Offset!.Value });
		return availableGamesResult.ToApiResponse();
	}

	[AllowAnonymous]
	public override async Task<IActionResult> GetActiveGames([FromQuery] GetActiveGamesRequest request)
	{
		var activeGamesResult = await _mediator.Send(new GetActiveAnonymousGamesQuery() { Limit = request.Limit!.Value, Offset = request.Offset!.Value });
		return activeGamesResult.ToApiResponse();
	}

	[AllowAnonymous]
	public override async Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request)
	{
		var createGameResult = await _mediator.Send(new CreateAnonymousGameCommand() { BoardSize = request.BoardSize, TimeControl = request.TimeControl });
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
	[AllowAnonymous]
	public async Task<IActionResult> AddPlayerToGame([FromRoute] string gameId, [FromBody] AddAnonymousPlayerToGameRequest request)
	{
		var addPlayerToGameResult = await _mediator.Send(new AddAnonymousPlayerToGameCommand() { GameId = gameId, PlayerId = request.PlayerId });

		if (addPlayerToGameResult.IsSuccess)
		{
			var message = new PlayerJoinedGameMessage { UserId = addPlayerToGameResult.Value.PlayerId };
			await _hubContext.Clients.Group(gameId).SendAsync(GameHubMethod.PlayerJoinedGame, message);
		}

		return addPlayerToGameResult.ToApiResponse();
	}
}

public record AddAnonymousPlayerToGameRequest
{
	public required string PlayerId { get; init; }
}
