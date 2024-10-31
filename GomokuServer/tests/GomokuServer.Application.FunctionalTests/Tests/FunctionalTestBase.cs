using GomokuServer.Application.FunctionalTests.Factory;
using GomokuServer.Application.FunctionalTests.TestData;
using GomokuServer.Application.Games.Interfaces;

using MediatR;

using Microsoft.Extensions.DependencyInjection;

namespace GomokuServer.Application.FunctionalTests.Tests;

public abstract class FunctionalTestBase
{
	protected GomokuWebApplicationFactory _factory;
	protected IServiceScopeFactory _scopeFactory;
	protected TestDataProvider _testDataProvider;

	[SetUp]
	public virtual void SetUp()
	{
		_factory = new GomokuWebApplicationFactory();
		_scopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();
		_testDataProvider = new TestDataProvider();
	}

	[TearDown]
	public virtual void TearDown()
	{
		_factory.Dispose();
	}

	protected IRegisteredGamesRepository RegisteredGamesRepository
	{
		get
		{
			using var scope = _scopeFactory.CreateScope();
			return scope.ServiceProvider.GetRequiredService<IRegisteredGamesRepository>();
		}
	}

	protected IAnonymousGamesRepository AnonymousGamesRepository
	{
		get
		{
			using var scope = _scopeFactory.CreateScope();
			return scope.ServiceProvider.GetRequiredService<IAnonymousGamesRepository>();
		}
	}

	protected async Task<TResponse> SendAsync<TResponse>(IRequest<TResponse> request)
	{
		using var scope = _scopeFactory.CreateScope();
		var mediator = scope.ServiceProvider.GetRequiredService<ISender>();
		return await mediator.Send(request);
	}

	protected async Task SendAsync(IBaseRequest request)
	{
		using var scope = _scopeFactory.CreateScope();
		var mediator = scope.ServiceProvider.GetRequiredService<ISender>();
		await mediator.Send(request);
	}
}
