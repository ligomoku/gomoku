using GomokuServer.Api.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
	var provider = builder.Services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

	foreach (var description in provider.ApiVersionDescriptions)
	{
		options.SwaggerDoc(description.GroupName, new Microsoft.OpenApi.Models.OpenApiInfo()
		{
			Title = $"Gomoku API v{description.ApiVersion}",
			Version = description.ApiVersion.ToString(),
			Description = description.IsDeprecated ? "This API version is deprecated" : ""
		});
	}
});

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
	const string localhostUrl = "http://localhost:4200";
	const string vercelUrl = "https://gomoku-ruddy.vercel.app";

	options.AddPolicy(CorsPolicyName.GomokuClient,
		builder => builder
			.WithOrigins(localhostUrl, vercelUrl)
			.WithMethods("GET", "POST", "PUT", "DELETE")
			.AllowAnyHeader()
			.AllowCredentials());
});

builder.Services.AddApiVersioning(option =>
{
	option.DefaultApiVersion = new ApiVersion(1, 0);
	option.AssumeDefaultVersionWhenUnspecified = true;
	option.ReportApiVersions = true;
	option.ApiVersionReader = new HeaderApiVersionReader("X-Version");
}).AddApiExplorer(options =>
{
	options.GroupNameFormat = "'v'VVV";
	options.SubstituteApiVersionInUrl = true;
});

//var clerkUrl = "https://allowed-muskrat-40.clerk.accounts.dev";
//var jwksUri = $"{clerkUrl}/.well-known/jwks.json";
//var jwks = await GetJwksAsync(jwksUri);

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//	.AddJwtBearer(options =>
//	{
//		options.TokenValidationParameters = new TokenValidationParameters
//		{
//			ValidateIssuer = true,
//			ValidIssuer = "https://allowed-muskrat-40.clerk.dev",
//			ValidateAudience = false,
//			ValidateIssuerSigningKey = true,
//			IssuerSigningKeyResolver = (token, securityToken, kid, validationParameters) =>
//			{
//				var key = jwks.Keys.FirstOrDefault(k => k.Kid == kid);
//				if (key == null)
//				{
//					throw new SecurityTokenException("Invalid key ID.");
//				}

//				var e = Base64UrlEncoder.DecodeBytes(key.E);
//				var n = Base64UrlEncoder.DecodeBytes(key.N);
//				var rsa = new RSACryptoServiceProvider();
//				rsa.ImportParameters(new RSAParameters { Exponent = e, Modulus = n });
//				return [new RsaSecurityKey(rsa)];
//			},
//			ValidateLifetime = true,
//			ClockSkew = TimeSpan.Zero,
//		};
//	});

builder.Services.AddSingleton<IRandomProvider, RandomProvider>();
builder.Services.AddSingleton<IGameRepository, InMemoryGameRepository>();
builder.Services.AddSingleton<IPlayersRepository, InMemoryPlayersRepository>();
builder.Services.AddScoped<IGameSessionHandler, GameSessionHandler>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
	var provider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
	foreach (var description in provider.ApiVersionDescriptions)
	{
		options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
	}
});

app.UseClerkJwtValidation();
//app.UseAuthentication();
//app.UseAuthorization();

app.UseCors(CorsPolicyName.GomokuClient);

app.MapControllers();

app.MapHub<GameHub>("/gamehub");

app.Run();

//static async Task<JsonWebKeySet> GetJwksAsync(string jwksUri)
//{
//	using var httpClient = new HttpClient();
//	var response = await httpClient.GetStringAsync(jwksUri);
//	var jwks = JsonSerializer.Deserialize<JsonWebKeySet>(response);
//	return jwks;
//}
