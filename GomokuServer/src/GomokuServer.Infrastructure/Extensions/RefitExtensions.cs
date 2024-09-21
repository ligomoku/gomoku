using Microsoft.Extensions.DependencyInjection;

namespace GomokuServer.Infrastructure.Extensions;

public static class RefitExtensions
{
	public static IHttpClientBuilder AddRefitHttpClient<TRefitService>(this IServiceCollection services, Action<IServiceProvider, HttpClient> configureHttpClient)
		where TRefitService : class
	{
		return services
			.AddRefitClient<TRefitService>()
			.ConfigureHttpClient(configureHttpClient)
			.AddPolicyHandler(GetRetryPolicy());
	}

	private static AsyncRetryPolicy<HttpResponseMessage> GetRetryPolicy()
	{
		return HttpPolicyExtensions
			.HandleTransientHttpError()
			.WaitAndRetryAsync(5, retryAttempt => TimeSpan.FromSeconds(1 + retryAttempt));
	}
}
