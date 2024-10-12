namespace GomokuServer.Api.Extensions;

public static class LoggingBuilderExtensions
{
	public static void RegisterLogger(this ILoggingBuilder builder, EnvVariables envVariables)
	{
		if (!string.IsNullOrWhiteSpace(envVariables.Sentry.Dsn))
		{
			builder.AddSentry(options =>
			{
				options.Dsn = envVariables.Sentry.Dsn;
				options.Debug = false;
				options.DiagnosticLevel = SentryLevel.Warning;
			});
		}
	}
}
