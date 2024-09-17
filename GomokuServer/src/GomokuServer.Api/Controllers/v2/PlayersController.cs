using System.Net.Mime;

namespace GomokuServer.Api.Controllers.v2;

[ApiController]
[ApiVersion("2.0")]
[Route("api/v2/[controller]")]
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

	[HttpPost]
	[ProducesResponseType(StatusCodes.Status200OK)]
	public async Task<IActionResult> CreateNewPlayer([FromBody] CreatePlayerRequest request)
	{
		var createPlayerResult = await _playersRepository.CreateAsync(request.Id);

		return createPlayerResult.ToApiResponse();
	}
}
