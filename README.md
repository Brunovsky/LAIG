# LAIG

### Start a game

Press one of the four playing modes in the GUI on the right (White vs Black).
If White is Bot, you should immediately see it play in the center of the board.

### Undo

You can undo every move recursively. You may undo moves while the bot is still thinking,
the server will finish processing the request normally but the response will be discarded.

### Clock

Counts in minutes from the start of the game. There is no play timeout (the bot often
takes several seconds to play on high difficulty).

### Rules

Turn 0 (white) must play in the center.

Changing rules in the GUI, as well as the Bot options, only takes effect on a new game.
