const REPLAY_INTERVAL = 3000;

class Pente {
    constructor(Board, P, Cap, Turn = 0, Move = null, Options = []) {
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
        return '[' + this.options.join(',') + ']';
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

    urlMove(Move) {
        const move = JSON.stringify(Move);
        const board = this.boardString();
        const p = this.pString();
        const cap = this.capString();
        const turn = this.turnString();
        const options = this.optionsString();

        const s = ['move', move, board, p, cap, turn, options].join('/');
        const url = new URL(s, HOST_PENTE);
        return url;
    }

    urlValid(move) {
        const move = JSON.stringify(move);
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

    fetchMove(move) {
        const url = this.urlMove(move);
        return fetch(url).then(response => response.json());
    }

    fetchValid(move) {
        const url = this.urlValid(move);
        return fetch(url).then(response => response.json());
    }
}

Pente.fromBot = function(json) {
    const board = json[0];
    const next = json[1];
    const cap = json[2];
    const turn = json[3];
    const move = json[4];

    return new Pente(board, next, cap, turn, move);
}

Pente.fromMove = function(json) {
    if (json === "invalid_move") {
        return null;
    }

    const board = json[0];
    const next = json[1];
    const cap = json[2];
    const turn = json[3];
    const move = json[4];

    return new Pente(board, next, cap, turn, move);
}

Pente.fromValid = function(json) {
    return json;
}

Pente.empty = function(size, Options) {
    const board = [];
    for (let i = 0; i < size; ++i) {
        const row = [];
        for (let j = 0; j < size; ++j) {
            row.push('c');
        }
        board.push(row);
    }
    const next = 'w';
    const cap = [0, 0];
    const extra = Options.slice();
    extra.push('board_size(' + size + ')');
    return new Pente(board, next, cap, 0, null, extra);
}

class PenteQueue {
    constructor(scene, white, black, size = 19, Options = []) {
        this.scene = scene;
        this.whiteKind = white;
        this.blackKind = black;

        this.size = size;
        this.options = Options;

        this.pentes = [Pente.empty(this.size, this.options)];

        this.prepare();
        this.inc = 0;
    }

    addMove(pente) {
        // If there are captures, reset the board
        const cap1 = pente.cap;
        const cap2 = this.current().cap;
    
        const reset = cap1.white !== cap2.white || cap1.black !== cap2.black;   
        const turn = pente.turn;
        const move = pente.move;
        const next = pente.next;
       
        if (next === 'b' || next === 'win-w') var color = 'white';
        if (next === 'w' || next === 'win-b') var color = 'black';

        if (reset) {
            let turns = this.searchTurn(pente, this.current());

            this.scene.removeFromBoard(turns);
            this.scene.setPiece(move[0], move[1], color)

        } else {
            
            this.scene.setPiece(move[0], move[1], color);
        }

        this.pentes.push(pente);
        return this;
    }

    subtractMatrix(newPente, oldPente) {
        const newBoard = newPente.board
        const oldBoard = oldPente.board

        let indexesRemoved = []
        for(let i = 0; i < newBoard.length; i++){
            for(let j = 0; j < newBoard.length; j++){
                if(newBoard[i][j] === 'c' && oldBoard[i][j] === 'w' || newBoard[i][j] === 'c'&& oldBoard[i][j] === 'b'){
                        indexesRemoved.push([i,j]) 
                }
            }
        }
        return indexesRemoved;
    }

    diffMatrix(board1, board2) {
        const diff = JSON.parse(JSON.stringify(board1));

        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                if (board1[i][j] !== board2[i][j]) {
                    diff[i][j] = 'c';
                } else {
                    diff[i][j] = 'n';
                }
            }
        }

        return diff;
    }

    searchTurn(newPente, oldPente) {
        const indexesRemoved = this.subtractMatrix(newPente, oldPente)
        const previous  = this.pentes
        let turns = Array(indexesRemoved.length).fill(null)
    
        for(let i = previous.length - 1; i >= 0; i--){
            const board = previous[i].board;
            for(const id in indexesRemoved){
                if(board[indexesRemoved[id][0]][indexesRemoved[id][1]] === 'c' && turns[id]===null){
                    turns[id] = {turn: previous[i].turn, index: indexesRemoved[id]}
                } 
            }
        }

        turns[0].color = newPente.next
        return turns
    }

    undo() {
        this.status = "undo";

        if (this.pentes.length > 1) {
            const oldPente = this.pentes.pop();
            const newPente = this.current();

            const oldBoard = oldPente.board;
            const newBoard = newPente.board;

            const diff = this.diffMatrix(oldBoard, newBoard);

            for (let i = 0; i < this.size; ++i) {
                for (let j = 0; j < this.size; ++j) {
                    if (diff[i][j] === 'c') continue;

                    if (oldBoard[i][j] === 'c' && newBoard[i][j] !== 'c') {
                        this.scene.removePiece(i + 1, j + 1);
                    } else {
                        const color = newBoard[i][j] === 'w' ? 'white' : 'black';
                        this.scene.setPiece(i + 1, j + 1, color);
                    }
                }
            }
           
            this.scene.scores.setScore(newPente.cap.white, newPente.cap.black);
        }

        this.prepare();

        return this;
    }

    current() {
        return this.pentes[this.pentes.length - 1];
    }

    history() {
        return this.pentes;
    }

    prepare() {
        const cur = this.current();

        this.status = cur.next;

        switch (cur.next) {
        case 'w':
            if (this.whiteKind === 'bot') {
                this.bot();
            }
            break;
        case 'b':
            if (this.blackKind === 'bot') {
                this.bot();
            }
            break;
        case 'win-w':
        case 'win-b':
            break;
        default:
            throw "INTERNAL: Bad next in Pente";
        }

        return this;
    }

    replay() {
        this.status = "replay";

        const history = this.pentes;

        this.pentes = [Pente.empty(this.size, this.options)];

        let i = 1, that = this;
        
        function show() {
            console.log(i);
            that.addMove(history[i++]);
            if (i < history.length) {
                setTimeout(show, 2000);
            } else {
                that.prepare();
            }
        };

        this.scene.removeAllPieces();

        setTimeout(show, 2000);
    }

    timeout(ms) {
        const mystatus = this.status;
        setTimeout(function() {
            if (this.status === mystatus) this.update();
        }, ms);
    }

    move(move) {
        const mystatus = `serving-move-${++this.inc}`;
        this.status = mystatus;

        const cur = this.current();

        this.timeout(2000);

        return cur.fetchMove(move).then(json => {
            const nextPente = Pente.fromMove(json);

            if (nextPente == null) {
                this.prepare();
                return null;
            }

            if (this.status === mystatus) {
                nextPente.options = this.options;
                return this.addMove(nextPente).prepare();
            }
        });
    }

    bot() {
        const mystatus = `serving-bot-${++this.inc}`;
        this.status = mystatus;

        const cur = this.current();

        this.timeout(8000);

        return cur.fetchBot().then(json => {
            const nextPente = Pente.fromBot(json);

            if (this.status === mystatus) {
                nextPente.options = this.options;
                return this.addMove(nextPente).prepare();
            }
        });
    }

    pick(move) {
        switch (this.status) {
        case 'w':
        case 'b':
            this.move(move);
        default:
            break;
        }

        return this;
    }
}

/**
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
*/
