using System.Linq.Expressions;

using GomokuServer.Application.Games.Interfaces;
using GomokuServer.Application.Games.Queries;
using GomokuServer.Application.UnitTests.TestData;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetAvailableToJoinGamesTests
{
	private TestDataProvider _testDataProvider;
	private IGamesRepository _gameRepository;
	private GetAvailableToJoinGamesQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_gameRepository = Substitute.For<IGamesRepository>();
		_handler = new GetAvailableToJoinGamesQueryHandler(_gameRepository);
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenNoGamesFound_ShouldReturnEmptySuccess()
	{
		// Arrange
		_gameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result.Success(Enumerable.Empty<Game>())));

		var query = new GetAvailableToJoinGamesQuery();

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().BeEmpty();
		await _gameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenGamesFound_ShouldReturnSuccessWithGames()
	{
		// Arrange
		var games = new List<Game>
		{
			_testDataProvider.GetGame_OnePlayerJoined(),
			_testDataProvider.GetGame_OnePlayerJoined(),
		};

		_gameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result.Success(games.AsEnumerable())));

		var query = new GetAvailableToJoinGamesQuery();

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().HaveCount(2);
		await _gameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenPlayerOneIsSet_ShouldReturnPlayerAsOpponentInResponse()
	{
		// Arrange
		var games = new List<Game>
		{
			_testDataProvider.GetGame_OnePlayerJoined(),
		};

		_gameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result.Success(games.AsEnumerable())));

		var query = new GetAvailableToJoinGamesQuery();

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().HaveCount(1);
		result.Value.Data.First().Opponent.UserName.Should().Be(games[0].Opponents[0].UserName);
		await _gameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenRepositoryFails_ShouldReturnFailure()
	{
		// Arrange
		_gameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result<IEnumerable<Game>>.Error("Error fetching games")));

		var query = new GetAvailableToJoinGamesQuery();

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
		result.Errors.First().Should().Be("Error fetching games");
		await _gameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}
}
