using Tapper;

namespace GomokuServer.Api.Hubs.Messages.Server;

[TranspilationSource]
public record GameStartedMessage(bool IsMyMoveFirst);
