let myGame
let player1Name
let player2Name

$(function() {
  $('button[name="new-game"]').on('click', createNewGame)
  addPlacePieceListener()
  $('#cancel').on('click', function (event) {
    myGame.cancelMovePiece()
  })
  $('#cancel').hide()
  addPlayAgainListener()
})

function createNewGame() {
  player1Name = $('input[name="player-1-name"]').val()
  player2Name = $('input[name="player-2-name"]').val()
  if (player1Name == "" || player2Name == "") {
    alert('Player names cannot be blank!')
    return
  } else if (player1Name == player2Name) {
    alert('Player names must be different!')
    return
  }
  createGame(startNewGame)
}

function startNewGame(gameData) {
  myGame = new Game(gameData)
  let player1 = new Player(player1Name)
  let player2 = new Player(player2Name)
  myGame.players.push(player1, player2)
  myGame.currentPlayer = player1
  $('.start-page').hide()
  $('.game-page').show()
  myGame.showPlayerPieces()
  myGame.promptPlayer("turn")
  myGame.renderGame()
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
  $('.winner-page').on("click", ".play-again", function (event) {
    myGame.playAgain()
  })
}
