class Game {
  constructor(gameData) {
    this.id = gameData.id
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
      $(".messages").empty()
    switch(type) {
      case "turn":
        $(".messages").append(`<div class="message-content typewriter">${this.currentPlayer.name}, it is your turn</div>`)
        break
      case "not empty":
        $(".messages").append("<div class='message-content typewriter'>Chose an empty field</div>")
        break
      case "not adjacent":
        $(".messages").append("<div class='message-content typewriter'>Chose an adjacent field</div>")
        break
      case "mill error":
        $(".messages").append("<div class='message-content typewriter'>You can't take a piece from a mill!</div>")
        break
      case "mill success":
        $(".messages").append("<div class='message-content typewriter'>You may take one of your opponent's pieces!</div>")
        break
      case "own piece":
        $(".messages").append("<div class='message-content typewriter'>Please select one of your pieces</div>")
        break
      case "opponent piece":
        $(".messages").append("<div class='message-content typewriter'>Please select an opponent's piece</div>")
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
      updateGame(this, this.renderGame.bind(this))
      this.totalPiecesPlaced++
      this.currentPlayer.piecesLeftToPlace--

      this.showPlayerPieces()

      if (this.isMill(nodeId)) {
        this.promptPlayer("mill success")
        console.log('Entering capturePiece mode');
        addCapturePieceListener()
        return
      }

      this.switchPlayer()

      // if (this.isWinner()) {
      //   this.gameOver()
      // }

      console.log("Current Player is: " + this.currentPlayer.name)

      if (this.totalPiecesPlaced >= 18) {
        console.log("18 pieces are placed! Switching listeners");
        addSelectPieceListener()
      }
    } else {
      this.promptPlayer("not empty")
    }
    this.renderGame()
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
      // $(`#${this.selectedPiece}`).removeClass(this.findPlayerClass(this.currentPlayer))
      // $(`#${this.selectedPiece}`).removeClass('selected')
      console.log("Should have removed class from old place");
      this.currentStatus[this.selectedPiece] = null
      // add class to new node (nodeId)
      // $(`#${nodeId}`).addClass(this.findPlayerClass(this.currentPlayer))
      // update currentStatus
      this.currentStatus[nodeId] = this.currentPlayer.name
      updateGame(this, this.renderGame.bind(this))
      if (this.isMill(nodeId)) {
        $('#cancel').hide()
        this.promptPlayer("mill success")
        console.log('Entering capturePiece mode');
        this.renderGame()
        addCapturePieceListener()
        return
      }

      // if (this.isWinner()) {
      //   this.gameOver()
      //   return
      // }

      this.switchPlayer()

      addSelectPieceListener()
      $('#cancel').hide()
      this.renderGame()
    } else {
      this.promptPlayer("not adjacent")
    }
  }

  cancelMovePiece() {
    $('#cancel').hide()
    //remove movePieceListener and add selectPieceListeners
    $(`#${this.selectedPiece}`).removeClass('selected')
    this.selectedPiece = null

    addSelectPieceListener()
  }

  capturePiece(nodeId) {
    if (this.currentStatus[nodeId] != this.currentPlayer.name && !this.isMill(nodeId) && this.currentStatus[nodeId] != null) {
      this.currentStatus[nodeId] = null
      updateGame(this, this.renderGame.bind(this))
      this.currentPlayer.capturedPieces++
      $(`#${nodeId}`).removeClass("player-1 player-2")

      this.showPlayerPieces()

      // if (this.isWinner()) {
      //   this.gameOver()
      //   return
      // }

      if (this.totalPiecesPlaced < 18) {
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

    if (this.isWinner()) {
      this.gameOver()
      return
    }

    this.renderGame()
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
    $('.messages').removeClass('blink-messages')
    $('.messages').addClass('blink-messages')
  }

  isWinner() {
    let twoPiecesLeft = this.players.some(player => {
      return player.capturedPieces >= 2
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

    if ((twoPiecesLeft) && myGame.totalPiecesPlaced >= 18) {
      return true
    } else if (noMoves && myGame.totalPiecesPlaced >= 18) {
      if (this.currentPlayer === this.players[0]) {
        this.currentPlayer = this.players[1]
      } else {
        this.currentPlayer = this.players[0]
      }
      return true
    } else {
      return false
    }
  }

  hasNoMoves(playerName) {
    let playersPieces = []
    for (let node in this.currentStatus) {
      if (this.currentStatus[node] === this.playerName) {
        currentPlayersPieces.push(node)
      }
    }

    let noMoves = !playersPieces.some(piece => {
      return ADJACENT_COMBINATIONS[piece].some(adjacentNode => {
        return this.currentStatus[adjacentNode] === null
      })
    })

    return noMoves
  }

  gameOver() {
    $('.game-page').hide()
    $('.winner-page .winner-message').html(`<div class='winner'>${this.currentPlayer.name} wins!</div>`)
    $('.winner-page').show()
    console.log(`${this.currentPlayer.name} wins!`)
  }

  playAgain() {
    $('.node').removeClass('player-1 player-2')
    $('.messages').removeClass('blink-messages')
    $('#cancel').hide()
    removeListeners()
    addPlacePieceListener()
    $('.winner-page').hide()
    createNewGame()
  }

  showPlayerPieces() {
    $(".own-pieces").empty()
    $(".captured-pieces").empty()

    this.players.forEach( (player, index) => {
      // show own pieces
      for (let i = 0; i < player.piecesLeftToPlace; i++) {
        if (index === 0) {
          $(".player-stats-1 .own-pieces").append("<div class='player-1-piece'></div>")
        } else if (index === 1) {
          $(".player-stats-2 .own-pieces").append("<div class='player-2-piece'></div>")
        }
      }

      // show captured pieces
      for (let i = 0; i < player.capturedPieces; i++) {
        if (index === 0) {
          $(".player-stats-1 .captured-pieces").append("<div class='player-2-piece'></div>")
        } else if (index === 1) {
          $(".player-stats-2 .captured-pieces").append("<div class='player-1-piece'></div>")
        }
      }
    })
  }

  renderGame() {
    this.renderNodes()
    this.renderPlayerStats()
  }

  renderNodes() {
    for (let nodeId in this.currentStatus) {
      if (this.currentStatus[nodeId] === this.players[0].name) {
        $(`#${nodeId}`).addClass('player-1')
      } else if (this.currentStatus[nodeId] === this.players[1].name) {
        $(`#${nodeId}`).addClass('player-2')
      } else {
        $(`#${nodeId}`).removeClass('player-1 player-2')
      }
      $('.node').removeClass('selected')
    }
  }

  renderPlayerStats() {
    this.showPlayerPieces()
    if (this.currentPlayer === this.players[0]) {
      $('.player-stats-1').css('opacity', 1.0)
      $('.player-stats-2').css('opacity', 0.25)
    } else {
      $('.player-stats-1').css('opacity', 0.25)
      $('.player-stats-2').css('opacity', 1.0)
    }
  }
}
