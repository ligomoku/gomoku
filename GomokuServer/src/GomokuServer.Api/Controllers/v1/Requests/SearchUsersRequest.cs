public class SearchUsersRequest
{
    [FromQuery]
    public required string Query { get; set; }

    [FromQuery]
    public int? Limit { get; set; } = 5;

    [FromQuery]
    public int? Offset { get; set; } = 0;
}
