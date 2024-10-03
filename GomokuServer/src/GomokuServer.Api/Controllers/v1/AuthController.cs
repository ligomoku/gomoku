using GomokuServer.Api.Controllers.v1.Responses;

using Microsoft.AspNetCore.Authorization;

namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
[Authorize]
public class AuthController : Controller
{
	/// <summary>
	/// Get auth user information
	/// </summary>
	[HttpGet("info")]
	[ProducesResponseType(StatusCodes.Status200OK)]
	public IActionResult AuthInfo()
	{
		var usernameClaim = User.Claims.Get(JwtClaims.UserName);
		var fullNameClaim = User.Claims.Get(JwtClaims.FullName);

		var response = new AuthInfoResponse()
		{
			UserName = usernameClaim,

			FullName = fullNameClaim,
		};

		return Ok(response);
	}
}
