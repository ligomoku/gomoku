var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
	var localhostUrl = "http://localhost:4200";
	var vercelUrl = "https://gomoku-ruddy.vercel.app";

	options.AddPolicy(CorsPolicyName.GomokuClient,
		builder => builder
			.WithOrigins(localhostUrl, vercelUrl)
			.WithMethods("GET", "POST", "PUT", "DELETE")
			.AllowAnyHeader()
			.AllowCredentials());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors(CorsPolicyName.GomokuClient);
app.MapControllers();

app.Run();
