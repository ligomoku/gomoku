namespace GomokuServer.Api;

[TranspilationSource]
public record GameOptions(int BoardSize, TimeControlDto TimeControl, bool Anonymous);
