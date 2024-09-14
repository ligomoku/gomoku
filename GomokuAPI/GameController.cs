using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace GomokuAPI
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private static object _lockObject = new object();
        private static IDictionary<int, IList<Move>> _movesByGameId = new Dictionary<int, IList<Move>>();
        private static int _waitingGameId = -1;
        private static int _gameCounter = 1;
        private static readonly Move _emptyMove = new Move()
        {
            GameId = -1,
            Player = "",
            Row = -1,
            Column = -1
        };

        [EnableCors("AllowSpecificOrigin")]
        [HttpGet()]
        public GameInfo GetGameInfo()
        {
            lock (_lockObject)
            {
                if (_waitingGameId == -1)
                {
                    _waitingGameId = _gameCounter++;
                    return new GameInfo()
                    {
                        GameId = _waitingGameId,
                        YourTurn = true
                    };
                }

                var gameInfo = new GameInfo()
                {
                    GameId = _waitingGameId,
                    YourTurn = false
                };

                _waitingGameId = -1;
                return gameInfo;
            }
        }

        [EnableCors("AllowSpecificOrigin")]
        [HttpPost]
        public bool UserPlayed([FromBody] Move move)
        {
            if (!_movesByGameId.TryGetValue(move.GameId, out var moves))
            {
                moves = new List<Move>();
                _movesByGameId[move.GameId] = moves;
            }

            moves.Add(move);
            return true;
        }

        [EnableCors("AllowSpecificOrigin")]
        [HttpGet("{gameId}")]
        public Move GetLastMove(int gameId)
        {
            if (!_movesByGameId.TryGetValue(gameId, out var moves) || moves.Count == 0)
                return _emptyMove;
            return moves.Last();
        }
    }
}
