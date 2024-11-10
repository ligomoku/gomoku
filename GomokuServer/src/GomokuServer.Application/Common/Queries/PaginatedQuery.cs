namespace GomokuServer.Application.Common.Queries;

public abstract record PaginatedQuery<TResponse> : IQuery<PaginatedResponse<TResponse>>
{
	public virtual int Limit { get; init; } = 5;
	public virtual int Offset { get; init; } = 0;
}

public abstract class PaginatedQueryHandler<TRequest, TResponse> : IQueryHandler<TRequest, PaginatedResponse<TResponse>>
	where TRequest : PaginatedQuery<TResponse>
{
	public async Task<Result<PaginatedResponse<TResponse>>> Handle(TRequest request, CancellationToken cancellationToken)
	{
		var totalItems = await GetTotalItemsAsync(request);

		if (!totalItems.IsSuccess)
		{
			// TODO: Probably should try implement MapAsync so we can chain Result call as well when we need to perform async operation
			return Result.Error("Unable to retrive count. See logs for more details");
		}

		var getDataResult = await GetDataAsync(request);

		return getDataResult.Map(data => new PaginatedResponse<TResponse>()
		{
			Data = data,
			Metadata = new PaginationMetadata
			{
				HasMoreItems = request.Offset + request.Limit < totalItems,
				TotalCount = totalItems
			}
		});
	}

	public abstract Task<Result<int>> GetTotalItemsAsync(TRequest request);

	public abstract Task<Result<TResponse>> GetDataAsync(TRequest request);
}
