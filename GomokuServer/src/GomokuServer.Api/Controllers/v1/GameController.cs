namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[EnableCors(CorsPolicyName.GomokuClient)]
public abstract class GameController : Controller
{
	/// <summary>
	/// Get game history by game id
	/// </summary>
	/// <response code="200">Information about game </response>
	/// <response code="404">Game by id not found</response>
	[HttpGet("{gameId}/history")]
	public abstract Task<IActionResult> GetGameHistory([FromRoute] string gameId);

	/// <summary>
	/// Get all games available to join
	/// </summary>
	/// <response code="200">Returns list of games that are available to join</response>
	[HttpGet("available-to-join")]
	public abstract Task<IActionResult> GetAvailableGames([FromQuery] PaginationRequest request);

	/// <summary>
	/// Get all active games
	/// </summary>
	/// <response code="200">Returns list of active games</response>
	[HttpGet]
	[Route("active")]
	public abstract Task<IActionResult> GetActiveGames([FromQuery] PaginationRequest request);

	/// <summary>
	/// Create new game
	/// </summary>
	/// <response code="200">Returns information about newly created game</response>
	[HttpPost]
	public abstract Task<IActionResult> CreateNewGame([FromBody] CreateGameRequest request);
}
