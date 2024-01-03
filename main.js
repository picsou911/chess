const board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDragStart,
    onDrop,
    onSnapEnd,
});

const game = new Chess();

function onDragStart(_source, piece) {
    if (game.game_over()) return false;
    if (piece && piece.search(/^b/) !== -1) return false;
}

function onDrop(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';
    setTimeout(makeComputerMove, 250);
}

function onSnapEnd() {}

function makeComputerMove() {
    const possibleMoves = game.moves();

    if (possibleMoves.length === 0) {
        alert('LA FIN!');
        resetGame();
        return;
    };

    const randomMove = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomMove]);
    board.position(game.fen());
}

function resetGame() {
    game.reset();
    board.start()
};

document.getElementById('resetButton').addEventListener('click', resetGame);