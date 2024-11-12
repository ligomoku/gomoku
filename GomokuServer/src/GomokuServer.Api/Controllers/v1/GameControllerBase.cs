using GomokuServer.Api.Swagger.Examples;
using GomokuServer.Application.Common.Responses;
using GomokuServer.Application.Games.Responses;

namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[EnableCors(CorsPolicyName.GomokuClient)]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public abstract class GameControllerBase : Controller
{
	/// <summary>
	/// Get game history by game id
	/// </summary>
	/// <response code="200">Information about game </response>
	/// <response code="404">Game by id not found</response>
	[HttpGet("{gameId}/history")]
	[ProducesResponseType(typeof(GetGameHistoryResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public abstract Task<IActionResult> GetGameHistory([FromRoute] string gameId);

	/// <summary>
	/// Get all games available to join
	/// </summary>
	/// <response code="200">Returns list of games that are available to join</response>
	[HttpGet("available-to-join")]
	[ProducesResponseType(typeof(PaginatedResponse<IEnumerable<GetAvailableGamesResponse>>), StatusCodes.Status200OK)]
	public abstract Task<IActionResult> GetAvailableGames([FromQuery] GetAvailableGamesRequest request);

	/// <summary>
	/// Get all active games
	/// </summary>
	/// <response code="200">Returns list of active games</response>
	[HttpGet]
	[Route("active")]
	[ProducesResponseType(typeof(PaginatedResponse<IEnumerable<GetActiveGamesResponse>>), StatusCodes.Status200OK)]
	public abstract Task<IActionResult> GetActiveGames([FromQuery] GetActiveGamesRequest request);

	/// <summary>
	/// Create new game
	/// </summary>
	/// <response code="200">Returns information about newly created game</response>
	[HttpPost]
	[ProducesResponseType(typeof(CreateGameResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
	[SwaggerResponseExample(StatusCodes.Status400BadRequest, typeof(BadRequestErrorExample))]
	public abstract Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request);
}
