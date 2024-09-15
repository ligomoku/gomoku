using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace GomokuServer.Api.Controllers.v2;

[ApiController]
[ApiVersion("2.0")]
[Route("api/v2/[Controller]")]
[EnableCors(CorsPolicyName.GomokuClient)]
public class GameController : Controller
{
	[HttpGet()]
	public IActionResult GetGameInfo()
	{
		return Ok();
	}
}
