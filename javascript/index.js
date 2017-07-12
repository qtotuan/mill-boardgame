
let myGame = new Game(123)
let board = new Board(myGame.id)
let player1 = new Player("Pat")
let player2 = new Player("Quynh")
myGame.players.push(player1, player2)
myGame.currentPlayer = player1

$(function() {
  myGame.showPlayerPieces()
  myGame.promptPlayer("turn")
  addPlacePieceListener()
  $('#cancel').on('click', function (event) {
    myGame.cancelMovePiece()
  })
  $('#cancel').hide()
})

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
