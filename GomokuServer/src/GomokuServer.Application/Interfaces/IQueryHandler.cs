﻿namespace GomokuServer.Application.Interfaces;
public interface IQueryHandler<TRequest, TResponse> : IRequestHandler<TRequest, Result<TResponse>>
	where TRequest : IQuery<TResponse>;
