using System.Linq.Expressions;

using GomokuServer.Application.Games.Queries;
using GomokuServer.Tests.Common;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetAvailableToJoinGamesTests
{
	private TestDataProvider _testDataProvider;
	private IRegisteredPlayersAwaitingGameRepository _registeredPlayersAwaitingGameRepository;
	private GetAvailableToJoinRegisteredGamesQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_registeredPlayersAwaitingGameRepository = Substitute.For<IRegisteredPlayersAwaitingGameRepository>();
		_handler = new GetAvailableToJoinRegisteredGamesQueryHandler(_registeredPlayersAwaitingGameRepository);
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenNoGamesFound_ShouldReturnEmptySuccess()
	{
		// Arrange
		_registeredPlayersAwaitingGameRepository.CountAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredPlayersAwaitingGameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>(), Arg.Any<Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>>())
			.Returns(Task.FromResult(Result.Success(Enumerable.Empty<PlayersAwaitingGame>())));

		// Act
		var result = await _handler.Handle(new GetAvailableToJoinRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().BeEmpty();
		await _registeredPlayersAwaitingGameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>(), Arg.Any<Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenGamesFound_ShouldReturnSuccessWithGames()
	{
		// Arrange
		var games = new List<PlayersAwaitingGame>
		{
			_testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined(),
			_testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined(),
		};

		_registeredPlayersAwaitingGameRepository.CountAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredPlayersAwaitingGameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>(), Arg.Any<Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>>())
			.Returns(Task.FromResult(Result.Success(games.AsEnumerable())));

		// Act
		var result = await _handler.Handle(new GetAvailableToJoinRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().HaveCount(2);
		await _registeredPlayersAwaitingGameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>(), Arg.Any<Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenPlayerOneIsSet_ShouldReturnPlayerAsOpponentInResponse()
	{
		// Arrange
		var games = new List<PlayersAwaitingGame>
		{
			_testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined(),
		};

		_registeredPlayersAwaitingGameRepository.CountAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredPlayersAwaitingGameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>(), Arg.Any<Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>>())
			.Returns(Task.FromResult(Result.Success(games.AsEnumerable())));

		// Act
		var result = await _handler.Handle(new GetAvailableToJoinRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().HaveCount(1);
		result.Value.Data.First().Opponent!.UserName.Should().Be(games[0].Opponents[0].UserName);
		await _registeredPlayersAwaitingGameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>(), Arg.Any<Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenRepositoryFails_ShouldReturnFailure()
	{
		// Arrange
		_registeredPlayersAwaitingGameRepository.CountAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredPlayersAwaitingGameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>(), Arg.Any<Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>>())
			.Returns(Task.FromResult(Result<IEnumerable<PlayersAwaitingGame>>.Error("Error fetching games")));

		// Act
		var result = await _handler.Handle(new GetAvailableToJoinRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
		result.Errors.First().Should().Be("Error fetching games");
		await _registeredPlayersAwaitingGameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<PlayersAwaitingGame, bool>>>(), Arg.Any<Func<IQueryable<PlayersAwaitingGame>, IOrderedQueryable<PlayersAwaitingGame>>>());
	}
}
