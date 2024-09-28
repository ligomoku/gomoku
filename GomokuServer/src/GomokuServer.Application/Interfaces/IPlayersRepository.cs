﻿namespace GomokuServer.Application.Interfaces;

public interface IPlayersRepository
{
	Task<Result<Player>> GetAsync(string id);

	Task<Result> CreateAsync(string id, string userName);
}
