using Ardalis.Result;

using GomokuServer.Api.Hubs.Exceptions;
using GomokuServer.Api.MatchingEngine;
using GomokuServer.Application.Games.Responses;

using Microsoft.AspNetCore.Authorization;

using SignalRSwaggerGen.Attributes;

namespace GomokuServer.Api.Hubs;

[SignalRHub(HubRoute.AnonymousGameHub)]
public class AnonymousGameHub : GameHub
{
	private readonly IMediator _mediator;

	public AnonymousGameHub(IMediator mediator, CompositeMatchingEngine compositeMatchingEngine) : base(compositeMatchingEngine)
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

	[AllowAnonymous]
	public override async Task MakeMove(MakeMoveClientMessage message)
	{
		await base.MakeMove(message);
	}

	[AllowAnonymous]
	public override Task RequestUndo(RequestUndoMessage message)
	{
		return base.RequestUndo(message);
	}

	[AllowAnonymous]
	public override Task ApproveUndo(ApproveUndoMessage message)
	{
		return base.ApproveUndo(message);
	}

	[AllowAnonymous]
	public override async Task Resign(ResignClientMessage message)
	{
		await base.Resign(message);
	}

	[AllowAnonymous]
	public override async Task RequestRematch(RematchRequestMessage message)
	{
		await base.RequestRematch(message);
	}

	[AllowAnonymous]
	public override async Task ApproveRematch(ApproveRematchMessage message)
	{
		await base.ApproveRematch(message);
	}

	[AllowAnonymous]
	public override async Task SendMessage(ChatMessageClientMessage messageRequest)
	{
		await base.SendMessage(messageRequest);
	}

	public override async Task SendInvitationToPlay(SendInvitationToPlayMessage _)
	{
		await Clients.Caller.SendAsync(GameHubMethod.GameHubError, new ErrorMessage("Invitations not supported for anonymous players"));
	}

	[AllowAnonymous]
	public override Task CancelRequest()
	{
		return base.CancelRequest();
	}

	protected override string GetPlayerId()
	{
		var playerId = Context?.GetHttpContext()?.Request.Query["player_id"];
		if (string.IsNullOrWhiteSpace(playerId))
			throw new PlayerIdEmptyInGameHubException();

		return playerId!;
	}

	protected override async Task<Result<GetGameHistoryResponse>> GetGameHistoryAsync(string gameId)
	{
		return await _mediator.Send(new GetAnonymousGameHistoryQuery { GameId = gameId });
	}

	protected override async Task<Result<PlaceTileResponse>> PlaceTileAsync(string gameId, TileDto tile)
	{
		return await _mediator.Send(new PlaceAnonymousTileCommand()
		{
			GameId = gameId,
			PlayerId = GetPlayerId(),
			Tile = tile
		});
	}

	protected override async Task<Result<UndoResponse>> UndoAsync(string gameId)
	{
		return await _mediator.Send(new AnonymousUndoCommand()
		{
			GameId = gameId,
			PlayerId = GetPlayerId(),
		});
	}

	protected override async Task<Result<ResignResponse>> ResignAsync(string gameId)
	{
		return await _mediator.Send(new AnonymousResignCommand()
		{
			GameId = gameId,
			PlayerId = GetPlayerId(),
		});
	}

	protected override async Task<Result<RematchResponse>> RematchAsync(string gameId)
	{
		return await _mediator.Send(new AnonymousRematchCommand()
		{
			GameId = gameId,
			PlayerId = GetPlayerId(),
		});
	}
}
