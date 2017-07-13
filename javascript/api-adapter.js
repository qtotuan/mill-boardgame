let baseURL = "http://localhost:3000/api/games/"

function getGame(gameId, callback) {
  $.get(baseURL + gameId, function (data) {
    console.log(data)
    callback(data)
  })
}

function createGame(callback) {
  $.post(baseURL, function (responseData) {
    console.log(responseData)
    callback(responseData)
  })
}

function updateGame(game, callback) {
  let gameStatusString = JSON.stringify(game.currentStatus)
  let gameData = {
    game: {
      status: gameStatusString
    }
  }
  $.post(baseURL + game.id, gameData, function (responseData) {
    console.log(responseData);
    callback(responseData)
  })
}
