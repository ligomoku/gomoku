using GomokuServer.Application.FunctionalTests.Factory;
using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Core.Games.Entities;

using MediatR;

using Microsoft.Extensions.DependencyInjection;

namespace GomokuServer.Application.FunctionalTests.Setup;

[SetUpFixture]
public partial class Testing
{
	private static GomokuWebApplicationFactory _factory = null!;
	private static IServiceScopeFactory _scopeFactory = null!;

	[OneTimeSetUp]
	public void RunBeforeAnyTests()
	{
		_factory = new GomokuWebApplicationFactory();
		_scopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();
	}

	public static async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
	{
		using var scope = _scopeFactory.CreateScope();

		var mediator = scope.ServiceProvider.GetRequiredService<ISender>();

		return await mediator.Send(request);
	}

	public static async Task SendAsync(IBaseRequest request)
	{
		using var scope = _scopeFactory.CreateScope();

		var mediator = scope.ServiceProvider.GetRequiredService<ISender>();

		await mediator.Send(request);
	}

	public static async Task AddRegisteredGameAsync(Game game)
	{
		using var scope = _scopeFactory.CreateScope();

		var repository = scope.ServiceProvider.GetRequiredService<IRegisteredGamesRepository>();

		await repository.SaveAsync(game);
	}
}
