using GomokuServer.Core.Common.Results;
using GomokuServer.Core.Games.Validations;

namespace GomokuServer.Core.Games.Results;

public record ResignResult : CoreResult<ResignValidationError>;
