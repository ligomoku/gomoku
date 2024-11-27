namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v1/rapfi")]
[EnableCors(CorsPolicyName.GomokuClient)]
public class RapfiEngineController : Controller
{
	private readonly IRapfiEngineApi _rapfiEngineApi;
	private readonly ILogger<RapfiEngineController> _logger;

	public RapfiEngineController(
		IRapfiEngineApi rapfiEngineApi,
		ILogger<RapfiEngineController> logger)
	{
		_rapfiEngineApi = rapfiEngineApi;
		_logger = logger;
	}

	/// <summary>
	/// Test connection with Rapfi engine
	/// </summary>
	/// <response code="200">Connection successful</response>
	/// <response code="500">Connection failed</response>
	[HttpGet("test")]
	public async Task<IActionResult> TestConnection()
	{
		try
		{
			var response = await _rapfiEngineApi.TestConnection();
			return Ok(new { status = "Connected to Rapfi engine", data = response });
		}
		catch (Refit.ApiException apiEx)
		{
			_logger.LogWarning(apiEx, "Failed to connect to Rapfi engine");
			return StatusCode((int)apiEx.StatusCode, new { status = "Failed to connect to Rapfi engine", error = apiEx.Message });
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Unexpected error connecting to Rapfi engine");
			return StatusCode(500, new { status = "Error connecting to Rapfi engine", error = ex.Message });
		}
	}
}
