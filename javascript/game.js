class Game {
  constructor(id) {
    this.id = id
    this.players = []
    this.totalPiecesPlaced = 0
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

  promptPlayer(type) {
    switch(type) {
      case "turn":
        $(".messages").text(`${this.currentPlayer.name}, it is your turn`)
        break
      case "not empty":
        $(".messages").text("Chose an empty field")
        break
      case "not adjacent":
        $(".messages").text("Chose an adjacent field")
        break
      case "mill error":
        $(".messages").text("You can't take a piece from a mill!")
        break
      case "mill success":
        $(".messages").text("You may take one of your opponent's pieces!")
        break
      case "own piece":
        $(".messages").text("Please select one of your pieces")
        break
      default:
        break
      }

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
      this.totalPiecesPlaced += 1
      this.switchPlayer()
      console.log("Current Player is: " + this.currentPlayer.name)

      if (this.totalPiecesPlaced >= 6) {
        console.log("18 pieces are placed! Switching listeners");
        removeListeners()
        addSelectPieceListener()
      }
    } else {
      this.promptPlayer("not empty")
    }
  }

  findPlayerClass(player) {
    if (this.players[0] === player) {
      return "player-1"
    } else {
      return "player-2"
    }
  }

  selectPiece(nodeId) {
    // check if selected Piece belongs to current player
    if (this.currentStatus[nodeId] === this.currentPlayer.name) {
      // set game.selectedPiece to event target nodeId
      this.selectedPiece = nodeId
      // add highlight to selected piece
      $(`#${nodeId}`).addClass('selected')
      // remove current selectPieceListeners, add movePieceListeners
      removeListeners()
      addMovePieceListener()
      $('#cancel').show()
    } else {
      this.promptPlayer("own piece")
    }
  }

  movePiece(nodeId) {
    // check if node is adjacent and empty
    if (ADJACENT_COMBINATIONS[this.selectedPiece].includes(nodeId) && this.currentStatus[nodeId] === null) {
      // remove color from selected field and update current status
      console.log("Correct adjacent piece selected!");
      $(`#${this.selectedPiece}`).removeClass(this.findPlayerClass(this.currentPlayer))
      $(`#${this.selectedPiece}`).removeClass('selected')
      console.log("Should have removed class from old place");
      this.currentStatus[this.selectedPiece] = null
      // add class to new node (nodeId)
      $(`#${nodeId}`).addClass(this.findPlayerClass(this.currentPlayer))
      // update currentStatus
      this.currentStatus[nodeId] = this.currentPlayer.name
      this.switchPlayer()
      removeListeners()
      addSelectPieceListener()
    } else {
      this.promptPlayer("not adjacent")
    }
  }

  cancelMovePiece() {
    //remove movePieceListener and add selectPieceListeners
    $(`#${this.selectedPiece}`).removeClass('selected')
    this.selectedPiece = null
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
    this.promptPlayer("turn")
  }

  isMill(nodeId) {
    const nodeToCheck = this.currentStatus[nodeId]
    return MILL_COMBINATIONS.some(combination => {
      if (combination.includes(nodeId)) {
        return combination.every(node => {
          return this.currentStatus[node] === nodeToCheck && nodeToCheck != null
        })
      }
    })
  }


  isWinner() {

  }

  isGameOver() {

  }


}
