using GomokuServer.Api.Attributes;

namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/[controller]")]
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
	[ClerkAuthorization]
	public async Task<IActionResult> CreateNewPlayer()
	{
		var userId = User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
		var userName = User.Claims.FirstOrDefault(c => c.Type == "userName")?.Value;

		if (userId == null || userName == null)
		{
			return new BadRequestObjectResult(new { ErrorMessage = "Missing 'userId' or 'userName' claim" });
		}

		var createPlayerResult = await _playersRepository.CreateAsync(userId, userName);

		return createPlayerResult.ToApiResponse();
	}
}
