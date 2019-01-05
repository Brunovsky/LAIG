class Pente {
    constructor(Board, P, Cap, Turn = 1, Move = null, Options = "[]") {
        this.board = Board;
        this.next = P;
        this.cap = Cap instanceof Array ? {white: Cap[0], black: Cap[1]} : Cap;
        this.turn = Turn;
        this.move = Move;
        this.options = Options;
    }

    boardString() {
        return '[' + this.board.map(row => '[' + row.join(',') + ']').join(',') + ']';
    }

    pString() {
        return this.next;
    }

    capString() {
        return JSON.stringify([this.cap.white, this.cap.black]);
    }

    turnString() {
        return this.turn.toString();
    }

    moveString() {
        return JSON.stringify(this.move);
    }

    optionsString() {
        return this.options;
    }

    urlBot() {
        const board = this.boardString();
        const p = this.pString();
        const cap = this.capString();
        const turn = this.turnString();
        const options = this.optionsString();

        const s = ['bot', board, p, cap, turn, options].join('/');
        const url = new URL(s, HOST_PENTE);
        return url;
    }

    urlMove() {
        const move = this.moveString();
        const board = this.boardString();
        const p = this.pString();
        const cap = this.capString();
        const turn = this.turnString();
        const options = this.optionsString();

        const s = ['move', move, board, p, cap, turn, options].join('/');
        const url = new URL(s, HOST_PENTE);
        return url;
    }

    urlValid() {
        const move = this.moveString();
        const board = this.boardString();
        const turn = this.turnString();
        const options = this.optionsString();

        const s = ['valid', move, board, turn, options].join('/');
        const url = new URL(s, HOST_PENTE);
        return url;
    }

    fetchBot() {
        const url = this.urlBot();
        return fetch(url).then(response => response.json());
    }

    fetchMove() {
        const url = this.urlMove();
        return fetch(url).then(response => response.json());
    }

    fetchValid() {
        const url = this.urlValid();
        return fetch(url).then(response => response.json());
    }
}

Pente.fromBot = function(response) {
    const board = response[0];
    const next = response[1];
    const cap = response[2];
    const turn = response[3];
    const move = response[4];

    return new Pente(board, next, cap, turn, move);
}

Pente.fromMove = function(response) {
    if (response === "invalid_move") {
        return null;
    }

    const board = response[0];
    const next = response[1];
    const cap = response[2];
    const turn = response[3];
    const move = response[4];

    return new Pente(board, next, cap, turn, move);
}

Pente.fromValid = function(response) {
    return response;
}

var board1 = [
//    1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19     5 [0,0]
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 1
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 2
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 3
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 4
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 5
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 6
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 7
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 8
    ['c','c','c','c','c','c','c','c','c','w','c','c','c','c','c','c','c','c','c'], // 9
    ['c','c','c','c','c','c','c','c','c','w','b','c','w','c','c','c','c','c','c'], // 10
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 11
    ['c','c','c','c','c','c','c','c','c','c','b','c','c','c','c','c','c','c','c'], // 12
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 13
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 14
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 15
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 16
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 17
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 18
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c']  // 19
], turn1 = 5, cap1 = [0,0];

var pente1 = new Pente(board1, 'b', cap1, turn1);

var board2 = [
//    1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19    12 [2,2]
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 1
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 2
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 3
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 4
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 5
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 6
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 7
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 8
    ['c','c','c','c','c','c','c','c','c','w','c','c','c','c','c','c','c','c','c'], // 9
    ['c','c','c','c','c','c','c','c','c','w','c','c','w','c','b','c','c','c','c'], // 10
    ['c','c','c','c','c','c','c','c','c','c','c','c','b','c','c','c','c','c','c'], // 11
    ['c','c','c','c','c','c','c','c','c','c','b','c','c','c','w','c','c','c','c'], // 12
    ['c','c','c','c','c','c','c','c','c','c','c','b','c','c','c','c','c','c','c'], // 13
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 14
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 15
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 16
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 17
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'], // 18
    ['c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c']  // 19
], turn2 = 12, cap2 = [2,2];

var pente2 = new Pente(board2, 'w', cap2, turn2);

var board3 = [
    ['c','c','c','c','c','c','c','c','c','c','c'],
    ['c','c','c','c','c','c','c','c','c','c','c'],
    ['c','c','c','b','w','w','w','c','c','c','c'],
    ['c','c','c','w','b','b','c','c','c','c','c'],
    ['c','c','c','c','w','c','c','c','c','c','c'],
    ['c','c','b','w','w','w','w','b','c','c','c'],
    ['c','c','c','c','c','c','b','c','b','c','c'],
    ['c','c','c','c','b','b','c','c','c','w','c'],
    ['c','c','c','c','w','c','c','c','c','c','c'],
    ['c','c','c','c','c','c','c','c','c','c','c'],
    ['c','c','c','c','c','c','c','c','c','c','c']
], turn3 = 24, cap3 = [2,2];

var pente3 = new Pente(board3, 'w', cap3, turn3, null, "[board_size(11)]");
