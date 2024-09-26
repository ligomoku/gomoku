using GomokuServer.Api.Attributes;
using GomokuServer.Api.Controllers.v1.Responses;

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
	public IActionResult AuthInfo()
	{
		var usernameClaim = User.Claims.FirstOrDefault(c => c.Type == "username")?.Value;
		var fullNameClaim = User.Claims.FirstOrDefault(c => c.Type == "fullName")?.Value;

		var response = new AuthInfoResponse()
		{
			UserName = usernameClaim,
			FullName = fullNameClaim,
		};

		return Ok(response);
	}
}
