using GomokuServer.Application.Games.Commands.Abstract;
using GomokuServer.Core.Profiles.Entities;

namespace GomokuServer.Application.Games.Commands;

public record AddRegisteredPlayerToGameCommand : AddPlayerToGameCommand
{
	[Required]
	public required string PlayerId { get; init; }
}

public class AddRegisteredPlayerToGameCommandHandler(
	IRegisteredGamesRepository _registeredGamesRepository,
	IProfilesRepository _profilesRepository)
	: AddPlayerToGameCommandHandler<AddRegisteredPlayerToGameCommand>(_registeredGamesRepository)
{
	public override async Task<Result<Profile>> GetProfileAsync(AddRegisteredPlayerToGameCommand request)
	{
		return await _profilesRepository.GetAsync(request.PlayerId);
	}
}

public record AddAnonymousPlayerToGameCommand : AddPlayerToGameCommand;

public class AddAnonymousPlayerToGameCommandHandler(IAnonymousGamesRepository _anonymousGamesRepository)
	: AddPlayerToGameCommandHandler<AddAnonymousPlayerToGameCommand>(_anonymousGamesRepository)
{
	public override Task<Result<Profile>> GetProfileAsync(AddAnonymousPlayerToGameCommand _)
	{
		var playerId = Guid.NewGuid().ToString();
		return Task.FromResult(Result.Success(new Profile(playerId, $"Guest {playerId[..6]}")));
	}
}
