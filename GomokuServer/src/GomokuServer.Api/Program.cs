var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
	options.AddPolicy(CorsPolicyName.GomokuLocalhostClient,
		builder => builder.WithOrigins("http://localhost:4200")
			.WithMethods("GET", "POST")
			.WithHeaders("content-type"));
}); ;

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors(CorsPolicyName.GomokuLocalhostClient);
app.MapControllers();

app.Run();
