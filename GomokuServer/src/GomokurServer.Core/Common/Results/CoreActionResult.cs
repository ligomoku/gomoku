﻿namespace GomokuServer.Core.Common.Results;

public abstract record CoreActionResult<T> where T : Enum
{
	public required bool IsValid { get; init; }

	public T? ValidationError { get; init; }

	public string? ErrorDetails { get; init; }
}
