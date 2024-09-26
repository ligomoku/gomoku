namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("[controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class HealthController : ControllerBase
{
	/// <summary>
	/// Health check endpoint
	/// </summary>
	/// <response code="200">Server is running</response>
	[HttpGet]
	[ProducesResponseType(StatusCodes.Status200OK)]
	public IActionResult Get()
	{
		return Ok(new { status = "Healthy" });
	}
}
