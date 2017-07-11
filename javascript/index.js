$(function() {
  let myGame = new Game(123)
  let board = new Board(myGame.id)
  let player1 = new Player("Pat")
  let player2 = new Player("Quynh")
  myGame.players.push(player1, player2)
  myGame.currentPlayer = player1

  $(".announcement").text = `${myGame.currentPlayer.name}, it is your turn!`


})
