using System.Security.Claims;

namespace GomokuServer.Api.Extensions;

public static class ClaimsExtensions
{
	public static string? Get(this IEnumerable<Claim> claims, string claimKey)
	{
		return claims.FirstOrDefault(c => c.Type == claimKey)?.Value;
	}
}
