using GomokuServer.Api.Attributes;

namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
[ClerkAuthorization]
public class AuthController : Controller
{
	/// <summary>
	/// Get auth user information
	/// </summary>
	[HttpGet("info")]
	[ProducesResponseType(StatusCodes.Status200OK)]
	public async Task<IActionResult> AuthInfo()
	{
		return Ok();
	}
}
