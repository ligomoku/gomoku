namespace GomokuServer.Api.MatchingEngine;

public class LobbyMember(string id)
{
	public string Id { get; } = id;
	public bool LeftQueue { get; set; }
	public bool GameFound { get; set; }
}
