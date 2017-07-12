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
      case "opponent piece":
        $(".messages").text("Please select an opponent's piece")
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

      if (this.isMill(nodeId)) {
        this.promptPlayer("mill success")
        console.log('Entering capturePiece mode');
        addCapturePieceListener()
        return
      }

      this.switchPlayer()

      if (this.isWinner()) {
        this.gameOver()
      }

      console.log("Current Player is: " + this.currentPlayer.name)

      if (this.totalPiecesPlaced >= 6) {
        console.log("18 pieces are placed! Switching listeners");
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

      if (this.isMill(nodeId)) {
        this.promptPlayer("mill success")
        console.log('Entering capturePiece mode');
        addCapturePieceListener()
        return
      }

      if (this.isWinner()) {
        this.gameOver()
        return
      }

      this.switchPlayer()

      addSelectPieceListener()
    } else {
      this.promptPlayer("not adjacent")
    }
  }

  cancelMovePiece() {
    //remove movePieceListener and add selectPieceListeners
    $(`#${this.selectedPiece}`).removeClass('selected')
    this.selectedPiece = null

    addSelectPieceListener()
  }

  capturePiece(nodeId) {
    if (this.currentStatus[nodeId] != this.currentPlayer.name && !this.isMill(nodeId) && this.currentStatus[nodeId] != null) {
      this.currentStatus[nodeId] = null
      this.currentPlayer.capturedPieces++
      $(`#${nodeId}`).removeClass("player-1 player-2")

      if (this.isWinner()) {
        this.gameOver()
        return
      }

      if (this.totalPiecesPlaced < 6) {
        addPlacePieceListener()
      } else {
        addSelectPieceListener()
      }

      this.switchPlayer()

    } else if (this.isMill(nodeId) && this.currentStatus[nodeId] != this.currentPlayer.name) {
      this.promptPlayer("mill error")
    } else {
      this.promptPlayer("opponent piece")
    }
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
        let millExists = combination.every(node => {
          return this.currentStatus[node] === nodeToCheck && nodeToCheck != null
        })
        if (millExists) {
          this.blinkMill(combination)
        }
        return millExists
      }
    })
  }

  blinkMill(combination) {
    combination.forEach( nodeId => {
      $(`#${nodeId}`).addClass('selected-mill')
      $(`#${nodeId}`).on("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
        $(this).removeClass("selected-mill")
      })
    })
  }

  isWinner() {
    let twoPiecesLeft = this.players.some(player => {
      return player.capturedPieces >= 1
    })

    let currentPlayersPieces = []
    for (let node in this.currentStatus) {
      if (this.currentStatus[node] === this.currentPlayer.name) {
        currentPlayersPieces.push(node)
      }
    }

    let noMoves = !currentPlayersPieces.some(piece => {
      return ADJACENT_COMBINATIONS[piece].some(adjacentNode => {
        return this.currentStatus[adjacentNode] === null
      })
    })

    if ((twoPiecesLeft || noMoves) && myGame.totalPiecesPlaced >= 6) {
      return true
    } else {
      return false
    }
  }

  gameOver() {
    $('.game-container').empty()
    $('.game-container').text(`${this.currentPlayer.name} wins!`)
    console.log(`${this.currentPlayer.name} wins!`)
  }

}
