## AI algorithms

### Basic AI One

The underlying principles of the Basic AI One are simple:

- Identify all the groups of five aligned positions in the board, be it a vertical, horizontal or diagonal alignment.
- For each color, figure out all the lines of five, four, three, two and one piece-s of that color which do not contain the other color
- Play at the place of greatest priority.

The priority of a position is a nine-uplet i.e. a series of ten numbers. The first is the number of lines of five that would be **completed** by playing there. The second is the number of lines of five that would be **prevented** by playing there. The third is the number of lines of four that would be completed. The fourth is the number of lines of four that would be prevented, and so on till the ninth.

### Basic AI Two

The Basic AI Two addresses an issue with the Basic AI One where it would play to extend a semi-blocked line of two pieces into a line of three pieces, when it should have played to prevent the opponent from getting a pair of three-pieces unblocked alignments. This behaviour is obtained by merging two priority levels for alignments of one or two pieces: the priority for extending our lines is no longer superior to the priority for blocking the opponent.

The Basic AI Two wins more than 80% of the games against the Basic AI One when playing second, and more than 90% of them when playing first. Indeed, Basic AI Two lost one game in a batch of eleven.

### PVS

The PVS algorithm implemented in this game relies on a "Basic AI" as an heuristics which tells them in what order the moves should be examined. When the depth limit is reach, the Heuristic used to measure the value of a position is based on the outcome of the game: "loose", "draw" or "win", as well as the number of moves it took to reach that outcome. If the outcome is a draw, the position scores 0. If the outcome is a win, the position scores `2 ** (412 - (number of half-moves))`.
