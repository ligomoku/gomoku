using GomokuServer.Application.Games.Commands.Abstract;

namespace GomokuServer.Application.Games.Commands;

public record CreateRegisteredGameCommand : CreateGameCommand
{
	[Required]
	public required string PlayerId { get; init; }
}

public class CreateRegisteredGameCommandHandler(
	IRegisteredGamesRepository _registeredGamesRepository,
	IProfilesRepository _profilesRepository,
	IRandomProvider _randomProvider,
	IDateTimeProvider _dateTimeProvider)
	: CreateGameCommandHandler<CreateRegisteredGameCommand>(_registeredGamesRepository, _dateTimeProvider, _randomProvider)
{
	public override async Task<Result<CreateGameResponse>> Handle(CreateRegisteredGameCommand request, CancellationToken cancellationToken)
	{
		return await _profilesRepository
			.GetAsync(request.PlayerId)
			.BindAsync(async _ => await base.Handle(request, cancellationToken));
	}
}

public record CreateAnonymousGameCommand : CreateGameCommand;

public class CreateAnonymousGameCommandHandler(
	IAnonymousGamesRepository _registeredGamesRepository,
	IDateTimeProvider _dateTimeProvider,
	IRandomProvider _randomProvider)
	: CreateGameCommandHandler<CreateAnonymousGameCommand>(_registeredGamesRepository, _dateTimeProvider, _randomProvider);
