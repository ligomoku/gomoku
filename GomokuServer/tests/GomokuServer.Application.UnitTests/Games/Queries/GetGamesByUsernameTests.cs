﻿using System.Linq.Expressions;

using GomokuServer.Application.Games.Queries;
using GomokuServer.Application.UnitTests.TestData;
using GomokuServer.Core.Interfaces;

namespace GomokuServer.Application.UnitTests.Games.Queries;

public class GetGamesByUsernameTests
{
	private TestDataProvider _testDataProvider;
	private IGameRepository _gameRepository;
	private IDateTimeProvider _dateTimeProvider;
	private GetGamesByUsernameQueryHandler _handler;

	[SetUp]
	public void Setup()
	{
		_testDataProvider = new TestDataProvider();
		_gameRepository = Substitute.For<IGameRepository>();
		_dateTimeProvider = Substitute.For<IDateTimeProvider>();
		_handler = new GetGamesByUsernameQueryHandler(_gameRepository);
	}

	[Test]
	public async Task GetGamesByUsername_WhenNoGamesFound_ShouldReturnEmptySuccess()
	{
		// Arrange
		_gameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result.Success(Enumerable.Empty<Game>())));

		_gameRepository.CountAsync(Arg.Any<Expression<Func<Game, bool>>>())
			.Returns(Task.FromResult(0));

		var query = new GetGamesByUsernameQuery { UserName = "TestUser" };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Ok);
		result.Value.Data.Should().BeEmpty();
		result.Value.Metadata.TotalCount.Should().Be(0);
		result.Value.Metadata.HasMoreItems.Should().BeFalse();
		await _gameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}

	[Test]
	public async Task GetGamesByUsername_WhenRepositoryFails_ShouldReturnFailure()
	{
		// Arrange
		_gameRepository.GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>())
			.Returns(Task.FromResult(Result<IEnumerable<Game>>.Error("Error fetching games")));

		var query = new GetGamesByUsernameQuery { UserName = "TestUser" };

		// Act
		var result = await _handler.Handle(query, CancellationToken.None);

		// Assert
		result.Status.Should().Be(ResultStatus.Error);
		result.Errors.First().Should().Be("Error fetching games");
		await _gameRepository.Received(1).GetByExpressionAsync(Arg.Any<Expression<Func<Game, bool>>>(), Arg.Any<Func<IQueryable<Game>, IOrderedQueryable<Game>>>());
	}
}