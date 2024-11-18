using GomokuServer.Core.Common.Results;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Results;

public record RemoveTileActionResult : CoreActionResult<RemoveTileValidationError>;
