using System.Linq.Expressions;

using GomokuServer.Application.Games.Queries;
using GomokuServer.Application.Games.Queries.Abstract;
using GomokuServer.Application.UnitTests.TestData;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetAvailableToJoinGamesTests
{
	private TestDataProvider _testDataProvider;
	private IRegisteredGamesRepository _registeredGamesRepository;
	private GetActiveGamesQueryHandler<GetActiveRegisteredGamesQuery> _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_registeredGamesRepository = Substitute.For<IRegisteredGamesRepository>();
		_handler = new GetActiveRegisteredGamesQueryHandler(_registeredGamesRepository);
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenNoGamesFound_ShouldReturnEmptySuccess()
	{
		// Arrange
		_registeredGamesRepository.CountAsync(Arg.Any<Expression<Func<Game, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredGamesRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result.Success(Enumerable.Empty<Game>())));

		// Act
		var result = await _handler.Handle(new GetActiveRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().BeEmpty();
		await _registeredGamesRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
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

		_registeredGamesRepository.CountAsync(Arg.Any<Expression<Func<Game, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredGamesRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result.Success(games.AsEnumerable())));

		// Act
		var result = await _handler.Handle(new GetActiveRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().HaveCount(2);
		await _registeredGamesRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenPlayerOneIsSet_ShouldReturnPlayerAsOpponentInResponse()
	{
		// Arrange
		var games = new List<Game>
		{
			_testDataProvider.GetGame_OnePlayerJoined(),
		};

		_registeredGamesRepository.CountAsync(Arg.Any<Expression<Func<Game, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredGamesRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result.Success(games.AsEnumerable())));

		// Act
		var result = await _handler.Handle(new GetActiveRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().HaveCount(1);
		result.Value.Data.First().Opponent!.UserName.Should().Be(games[0].Opponents[0].UserName);
		await _registeredGamesRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}

	[Test]
	public async Task GetAvailableToJoinGames_WhenRepositoryFails_ShouldReturnFailure()
	{
		// Arrange
		_registeredGamesRepository.CountAsync(Arg.Any<Expression<Func<Game, bool>>>())
			.Returns(Task.FromResult(Result.Success(1)));
		_registeredGamesRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result<IEnumerable<Game>>.Error("Error fetching games")));

		// Act
		var result = await _handler.Handle(new GetActiveRegisteredGamesQuery(), CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
		result.Errors.First().Should().Be("Error fetching games");
		await _registeredGamesRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}
}
