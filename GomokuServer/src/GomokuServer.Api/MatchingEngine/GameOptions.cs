namespace GomokuServer.Api.MatchingEngine;

[TranspilationSource]
public record GameOptions(int BoardSize, TimeControlDto TimeControl, bool Anonymous);
