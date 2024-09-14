namespace GomokuAPI
{
    public class Move
    {
        public int GameId { get; set; }
        public string Player { get; set; }
        public short Row { get; set; }
        public short Column { get; set; }
    }
}
