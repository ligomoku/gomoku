namespace GomokuServer.Api.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v1/rapfi")]
[EnableCors(CorsPolicyName.GomokuClient)]
public class RapfiEngineController : Controller
{
	private readonly HttpClient _httpClient;
	private readonly ILogger<RapfiEngineController> _logger;

	public RapfiEngineController(
		IHttpClientFactory httpClientFactory,
		ILogger<RapfiEngineController> logger)
	{
		_httpClient = httpClientFactory.CreateClient("RapfiEngine");
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
			var response = await _httpClient.GetAsync("test");
			if (response.IsSuccessStatusCode)
			{
				return Ok(new { status = "Connected to Rapfi engine" });
			}

			_logger.LogWarning("Failed to connect to Rapfi engine. Status code: {StatusCode}", response.StatusCode);
			return StatusCode((int)response.StatusCode, new { status = "Failed to connect to Rapfi engine" });
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Error connecting to Rapfi engine");
			return StatusCode(500, new { status = "Error connecting to Rapfi engine", error = ex.Message });
		}
	}
}
