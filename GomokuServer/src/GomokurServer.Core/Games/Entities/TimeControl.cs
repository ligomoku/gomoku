using Tapper;

namespace GomokuServer.Core.Games.Entities;

[TranspilationSource]
public record TimeControl(int InitialTimeInSeconds, int IncrementPerMove);
