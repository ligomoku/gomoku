using GomokuServer.Application.Games.Commands.Abstract;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.Games.Commands;

public record CreateRegisteredGameForPairCommand : CreateGameForPairCommand;
public class CreateRegisteredGameForPairHandler(
	IDateTimeProvider dateTimeProvider,
	IRandomProvider randomProvider,
	IRegisteredGamesRepository registeredGamesRepository,
	IProfilesRepository profilesRepository)
	: CreateGameForPairCommandHandler<CreateRegisteredGameForPairCommand>(dateTimeProvider, registeredGamesRepository, randomProvider)
{
	protected override async Task<Result<Profile>> GetProfileAsync(string userId)
	{
		return await profilesRepository.GetAsync(userId);
	}
}

public record CreateAnonymousGameForPairCommand : CreateGameForPairCommand;
public class CreateAnonymousGameForPairHandler(
	IDateTimeProvider dateTimeProvider,
	IRandomProvider randomProvider,
	IAnonymousGamesRepository anonymousGamesRepository)
	: CreateGameForPairCommandHandler<CreateAnonymousGameForPairCommand>(dateTimeProvider, anonymousGamesRepository, randomProvider)
{
	protected override Task<Result<Profile>> GetProfileAsync(string userId)
	{
		return Task.FromResult(Result.Success(new Profile(userId, $"Guest {userId[..6]}")));
	}
}
