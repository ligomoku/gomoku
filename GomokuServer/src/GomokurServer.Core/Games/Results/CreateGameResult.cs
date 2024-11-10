using GomokuServer.Core.Common.Results;
using GomokuServer.Core.Games.Entities;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Results;

public record CreateGameResult : CoreResult<CreateGameValidationError>
{
	public Game? CreatedGame { get; init; }
};
