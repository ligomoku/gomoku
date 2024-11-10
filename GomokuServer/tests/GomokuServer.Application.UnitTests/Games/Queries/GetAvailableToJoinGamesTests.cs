using System.Linq.Expressions;

using GomokuServer.Application.Games.Queries;
using GomokuServer.Tests.Common;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetAvailableToJoinGamesTests
{
	private TestDataProvider _testDataProvider;
	private IRegisteredAwaitingPlayersGamesRepository _registeredAwaitingPlayersGamesRepository;
	private GetAvailableToJoinRegisteredGamesQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_registeredAwaitingPlayersGamesRepository = Substitute.For<IRegisteredAwaitingPlayersGamesRepository>();
		_handler = new GetAvailableToJoinRegisteredGamesQueryHandler(_registeredAwaitingPlayersGamesRepository);
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenNoGamesFound_ShouldReturnEmptySuccess()
	{
		// Arrange
		_registeredAwaitingPlayersGamesRepository.CountAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredAwaitingPlayersGamesRepository.GetByExpressionAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>(), Arg.Any<Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>>())
			.Returns(Task.FromResult(Result.Success(Enumerable.Empty<AwaitingPlayersGame>())));

		// Act
		var result = await _handler.Handle(new GetAvailableToJoinRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().BeEmpty();
		await _registeredAwaitingPlayersGamesRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>(), Arg.Any<Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenGamesFound_ShouldReturnSuccessWithGames()
	{
		// Arrange
		var games = new List<AwaitingPlayersGame>
		{
			_testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined(),
			_testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined(),
		};

		_registeredAwaitingPlayersGamesRepository.CountAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredAwaitingPlayersGamesRepository.GetByExpressionAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>(), Arg.Any<Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>>())
			.Returns(Task.FromResult(Result.Success(games.AsEnumerable())));

		// Act
		var result = await _handler.Handle(new GetAvailableToJoinRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().HaveCount(2);
		await _registeredAwaitingPlayersGamesRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>(), Arg.Any<Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenPlayerOneIsSet_ShouldReturnPlayerAsOpponentInResponse()
	{
		// Arrange
		var games = new List<AwaitingPlayersGame>
		{
			_testDataProvider.GetAwaitingPlayersGame_OnePlayerJoined(),
		};

		_registeredAwaitingPlayersGamesRepository.CountAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredAwaitingPlayersGamesRepository.GetByExpressionAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>(), Arg.Any<Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>>())
			.Returns(Task.FromResult(Result.Success(games.AsEnumerable())));

		// Act
		var result = await _handler.Handle(new GetAvailableToJoinRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().HaveCount(1);
		result.Value.Data.First().Opponent!.UserName.Should().Be(games[0].Opponents[0].UserName);
		await _registeredAwaitingPlayersGamesRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>(), Arg.Any<Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenRepositoryFails_ShouldReturnFailure()
	{
		// Arrange
		_registeredAwaitingPlayersGamesRepository.CountAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredAwaitingPlayersGamesRepository.GetByExpressionAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>(), Arg.Any<Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>>())
			.Returns(Task.FromResult(Result<IEnumerable<AwaitingPlayersGame>>.Error("Error fetching games")));

		// Act
		var result = await _handler.Handle(new GetAvailableToJoinRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
		result.Errors.First().Should().Be("Error fetching games");
		await _registeredAwaitingPlayersGamesRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<AwaitingPlayersGame, bool>>>(), Arg.Any<Func<IQueryable<AwaitingPlayersGame>, IOrderedQueryable<AwaitingPlayersGame>>>());
	}
}
