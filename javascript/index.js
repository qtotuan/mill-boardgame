let myGame = new Game(123)
let board = new Board(myGame.id)

$(function() {
  $('button[name="new-game"]').on('click', startNewGame)
  addPlacePieceListener()
  $('#cancel').on('click', function (event) {
    myGame.cancelMovePiece()
  })
  $('#cancel').hide()
  addPlayAgainListener()
})

function startNewGame() {
  let player1Name = $('input[name="player-1-name"]').val()
  let player2Name = $('input[name="player-2-name"]').val()
  let player1 = new Player(player1Name)
  let player2 = new Player(player2Name)
  myGame.players.push(player1, player2)
  myGame.currentPlayer = player1
  $('.start-page').hide()
  $('.game-page').show()
  myGame.showPlayerPieces()
  myGame.promptPlayer("turn")
}

function addPlacePieceListener() {
    removeListeners()
    $('.node').on('click', function (event) {
      myGame.placePiece(this.id)
    })
}

function addSelectPieceListener() {
    removeListeners()
    $('.node').on('click', function (event) {
      myGame.selectPiece(this.id)
    })
}

function addMovePieceListener() {
    removeListeners()
    $('.node').on('click', function (event) {
      myGame.movePiece(this.id)
    })
}

function addCapturePieceListener() {
    removeListeners()
    $('.node').on('click', function (event) {
      myGame.capturePiece(this.id)
    })
}

function removeListeners() {
  $('.node').off("click")
}

function addPlayAgainListener() {
  $('.buttons').on("click", ".play-again", function (event) {
    myGame.playAgain()
  })
}
