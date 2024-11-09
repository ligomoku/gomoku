namespace GomokuServer.Application.Games.Queries;

public class SearchProfilesQuery : IPaginatedQuery<PaginatedResponse<IEnumerable<ProfileDto>>>
{
	[Required]
	public required string Query { get; set; }

	public int Limit { get; init; } = 5;
	public int Offset { get; init; } = 0;
}

public class SearchProfilesQueryHandler : IQueryHandler<SearchProfilesQuery, PaginatedResponse<IEnumerable<ProfileDto>>>
{
	private readonly IProfilesRepository _profilesRepository;

	public SearchProfilesQueryHandler(IProfilesRepository profilesRepository)
	{
		_profilesRepository = profilesRepository;
	}

	public async Task<Result<PaginatedResponse<IEnumerable<ProfileDto>>>> Handle(SearchProfilesQuery request, CancellationToken cancellationToken)
	{
		// Use the search query, limit, and offset to fetch matching profiles
		var searchResult = await _profilesRepository.SearchAsync(request.Query, request.Limit, request.Offset);

		if (!searchResult.IsSuccess)
			return Result.Error(string.Join("; ", searchResult.Errors));

		// Map profiles to DTOs for response
		var profileDtos = searchResult.Value.Select(profile => new ProfileDto(profile.Id, profile.UserName)).ToList();

		// Get total count for pagination metadata
		var totalCount = searchResult.Value.Count();  // Adjust if total count available from repository directly
		var hasMoreItems = request.Offset + request.Limit < totalCount;

		// Return paginated response
		return Result.Success(new PaginatedResponse<IEnumerable<ProfileDto>>()
		{
			Data = profileDtos,
			Metadata = new PaginationMetadata()
			{
				TotalCount = totalCount,
				HasMoreItems = hasMoreItems
			}
		});
	}
}
