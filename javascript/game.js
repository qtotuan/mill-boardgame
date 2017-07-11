class Game {
  constructor(id) {
    this.id = id
    this.players = []
    this.selectedPiece
    this.currentPlayer
    this.currentStatus = {
      "node-1": null,
      "node-2": null,
      "node-3": null,
      "node-4": null,
      "node-5": null,
      "node-6": null,
      "node-7": null,
      "node-8": null,
      "node-9": null,
      "node-10": null,
      "node-11": null,
      "node-12": null,
      "node-13": null,
      "node-14": null,
      "node-15": null,
      "node-16": null,
      "node-17": null,
      "node-18": null,
      "node-19": null,
      "node-20": null,
      "node-21": null,
      "node-22": null,
      "node-23": null,
      "node-24": null,
    }
  }

  main() {

  }

  placePiece(nodeId) {
    // Check if field is empty
    if (this.currentStatus[nodeId] === null) {
      let piece = new Piece(this.currentPlayer, nodeId)
      if (this.currentPlayer === this.players[0]) {
        $(`#${nodeId}`).addClass('player-1')
      } else {
        $(`#${nodeId}`).addClass('player-2')
      }
      this.currentStatus[nodeId] = this.currentPlayer.name
      this.currentPlayer.piecesLeft -= 1
      this.switchPlayer()
    } else {
      // prompt Player to select empty field
    }
  }

  selectPiece(nodeId) {
    // check if selected Piece belongs to current player
    if (this.currentStatus[nodeId] === this.currentPlayer.name) {
      // set game.selectedPiece to event target nodeId
      this.selectedPiece = nodeId
      // remove current selectPieceListeners, add movePieceListeners

    } else {
      // prompt player that he must select his own pieces
    }
  }

  function findPlayerClass(player) {
    if (this.players[0] === player) {
      return "player-1"
    } else {
      return "player-2"
    }
  }

  movePiece(nodeId) {
    // check if node is adjacent and empty
    if (ADJACENT_COMBINATIONS[this.selectedPiece].includes(nodeId) && this.currentStatus[nodeId] === null) {
      // remove color from selected field and update current status
      $(`#${this.selectedPiece}`).removeClass(findPlayerClass(this.currentPlayer))
      this.currentStatus[this.selectedPiece] = null
      // add class to new node (nodeId)
      $(`#${nodeId}`).addClass(findPlayerClass(this.currentPlayer))
      // update currentStatus
      this.currentStatus[nodeId] = this.currentPlayer.name
    } else {
      // prompt player to make a valid move
    }
  }

  cancelMovePiece() {
    //remove movePieceListener and add selectPieceListeners
    removeListeners()
    addSelectPieceListener()
  }

  capturePiece() {

  }

  switchPlayer() {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1]
    } else {
      this.currentPlayer = this.players[0]
    }
    console.log(this.currentPlayer);
  }

  isValidMove() {
    if (player.piecesLeft === 0) {
      if (isEmptyNode() && isAdjacentNode()) {
        return true
      } else {
        return false
      }
    } else {
      if (isEmptyNode()) {
        return true
      } else {
        return false
      }
    }
  }

  isEmptyNode() {

  }

  isAdjacentNode() {

  }

  isMill() {

  }


  isWinner() {

  }

  isGameOver() {

  }


}
