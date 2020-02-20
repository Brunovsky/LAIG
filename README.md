# LAIG

Project partner: [Daniel Gomes](https://github.com/cdanielgomes)

### Initial setup

On the zip's root directory (above LAIG/) initiate the HTTP server,
for example with

    python3 -m http.server 8080 &

The initialize the Pente server, run sicstus or equivalent in the LAIG/plog/ folder.
In the PROLOG console, run commands

    compile('main.pl').
    server. 

### Start a game

Press one of the four playing modes in the GUI on the right (White vs Black).

If White is Bot, you should immediately see it playing in the center of the board.

### Undo

You can undo every move (recursively). You may undo moves while the bot is still thinking;
the server will finish processing the request normally but the response will be discarded.

### Rules

First move (White) must be played in the center.

Changing rules in the GUI, as well as the Bot parameters, only takes effect on a new game.

### How to Play

As simple as could be expected --- just click on the board intersection you would like to play on.
Every other action is implemented through the GUI.
