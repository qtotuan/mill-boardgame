class Game {
  constructor(id) {
    this.id = id
    this.players = [],
  }

  currentStatus() {
    {
      node1: null,
      node2: null,
      node3: null,
      node4: null,
      node5: null,
      node6: null,
      node7: null,
      node8: null,
      node9: null,
      node10: null,
      node11: null,
      node12: null,
      node13: null,
      node14: null,
      node15: null,
      node16: null,
      node17: null,
      node18: null,
      node19: null,
      node20: null,
      node21: null,
      node22: null,
      node23: null,
      node24: null,
    }
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
