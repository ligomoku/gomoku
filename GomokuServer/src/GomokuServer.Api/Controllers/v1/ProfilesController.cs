using GomokuServer.Api.Swagger.Examples;

namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class ProfilesController : Controller
{
	private readonly IMediator _mediator;

	public ProfilesController(IMediator mediator)
	{
		_mediator = mediator;
	}

	/// <summary>
	/// Get games for specific user
	/// </summary>
	/// <response code="200">Information about user games</response>
	[HttpGet("{userName}/games")]
	[ProducesResponseType(typeof(PaginatedResponse<IEnumerable<GetGamesByUsernameResponse>>), StatusCodes.Status200OK)]
	[SwaggerResponseExample(StatusCodes.Status404NotFound, typeof(NotFoundErrorExample))]
	public async Task<IActionResult> GetUserGames([FromRoute] string userName, [FromQuery] PaginationRequest pagination)
	{
		var getUserGamesResult = await _mediator.Send(new GetGamesByUsernameQuery() { UserName = userName, Limit = pagination.Limit, Offset = pagination.Offset });

		return getUserGamesResult.ToApiResponse();
	}
}
