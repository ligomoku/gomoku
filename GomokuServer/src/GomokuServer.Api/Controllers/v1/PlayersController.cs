namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v1/[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class PlayersController : Controller
{
	private readonly IPlayersRepository _playersRepository;

	public PlayersController(IPlayersRepository playersRepository)
	{
		_playersRepository = playersRepository;
	}

	/// <summary>
	/// Create new player
	/// </summary>
	[HttpPost]
	[ProducesResponseType(StatusCodes.Status200OK)]
	public async Task<IActionResult> CreateNewPlayer([FromBody] CreatePlayerRequest request)
	{
		var createPlayerResult = await _playersRepository.CreateAsync(request.Id);

		return createPlayerResult.ToApiResponse();
	}
}
