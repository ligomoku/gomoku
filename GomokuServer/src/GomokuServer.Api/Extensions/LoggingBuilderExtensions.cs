namespace GomokuServer.Api.Extensions;

public static class LoggingBuilderExtensions
{
	public static void RegisterLogger(this ILoggingBuilder builder, EnvVariables envVariables)
	{
		if (!string.IsNullOrWhiteSpace(envVariables.Centry.Dsn))
		{
			builder.AddSentry(options =>
			{
				options.Dsn = envVariables.Centry.Dsn;
				options.Debug = false;
				options.DiagnosticLevel = SentryLevel.Warning;
			});
		}
	}
}
