using Ardalis.Result;

using GomokuServer.Api.Hubs.Exceptions;
using GomokuServer.Application.Games.Responses;

using Microsoft.AspNetCore.Authorization;

using SignalRSwaggerGen.Attributes;

namespace GomokuServer.Api.Hubs;

[SignalRHub(HubRoute.RegisteredGameHub)]
public class RegisteredGameHub : GameHub
{
	private readonly IMediator _mediator;

	public RegisteredGameHub(IMediator mediator)
	{
		_mediator = mediator;
	}

	[AllowAnonymous]
	public override async Task JoinGameGroup(string gameId)
	{
		await base.JoinGameGroup(gameId);
	}

	[AllowAnonymous]
	public override async Task GetClock(GetClockMessage message)
	{
		await base.GetClock(message);
	}

	[Authorize]
	public override async Task MakeMove(MakeMoveClientMessage message)
	{
		await base.MakeMove(message);
	}

	[Authorize]
	public override async Task Resign(ResignClientMessage message)
	{
		await base.Resign(message);
	}

	[Authorize]
	public override async Task RequestRematch(RematchRequestMessage message)
	{
		await base.RequestRematch(message);
	}

	[Authorize]
	public override async Task ApproveRematch(ApproveRematchMessage message)
	{
		await base.ApproveRematch(message);
	}

	[Authorize]
	public override async Task SendMessage(ChatMessageClientMessage messageRequest)
	{
		await base.SendMessage(messageRequest);
	}

	protected override string GetPlayerId()
	{
		var playerId = Context?.User?.Claims.Get(JwtClaims.UserId);
		if (string.IsNullOrWhiteSpace(playerId))
		{
			throw new PlayerIdEmptyInGameHubException();
		}

		return playerId!;
	}

	protected override async Task<Result<GetGameHistoryResponse>> GetGameHistoryAsync(string gameId)
	{
		return await _mediator.Send(new GetRegisteredGameHistoryQuery { GameId = gameId });
	}

	protected override async Task<Result<PlaceTileResponse>> PlaceTileAsync(string gameId, TileDto tile)
	{
		return await _mediator.Send(new PlaceRegisteredTileCommand()
		{
			GameId = gameId,
			PlayerId = GetPlayerId(),
			Tile = tile
		});
	}

	protected override async Task<Result<ResignResponse>> ResignAsync(string gameId)
	{
		return await _mediator.Send(new RegisteredResignCommand()
		{
			GameId = gameId,
			PlayerId = GetPlayerId(),
		});
	}

	protected override async Task<Result<RematchResponse>> RematchAsync(string gameId)
	{
		return await _mediator.Send(new RegisteredRematchCommand()
		{
			GameId = gameId,
			PlayerId = GetPlayerId(),
		});
	}
}
