namespace GomokuServer.Api.Controllers.v2;

[ApiController]
[ApiVersion("2.0")]
[Route("api/v2/[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
public class PlayersController : Controller
{
	private readonly IPlayersRepository _playersRepository;

	public PlayersController(IPlayersRepository playersRepository)
	{
		_playersRepository = playersRepository;
	}

	[HttpPost]
	public async Task<IActionResult> CreateNewPlayer([FromBody] CreatePlayerRequest request)
	{
		var createPlayerResult = await _playersRepository.CreateAsync(request.Id);

		return createPlayerResult.ToApiResponse();
	}
}
