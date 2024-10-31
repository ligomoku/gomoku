using GomokuServer.Application.FunctionalTests.Infrastructure;
using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Application.Profiles.Interfaces;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace GomokuServer.Application.FunctionalTests.Factory;

public class GomokuWebApplicationFactory : WebApplicationFactory<Program>
{
	protected override void ConfigureWebHost(IWebHostBuilder builder)
	{
		builder.ConfigureTestServices(services =>
		{
			services
				.RemoveAll<IRegisteredGamesRepository>()
				.AddSingleton<IRegisteredGamesRepository, TestsRegisteredGamesRepository>()
				.RemoveAll<IAnonymousGamesRepository>()
				.AddSingleton<IAnonymousGamesRepository, TestsAnonymousGamesRepository>()
				.RemoveAll<IProfilesRepository>()
				.AddSingleton<IProfilesRepository, TestsProfilesRepository>();
		});
	}
}
