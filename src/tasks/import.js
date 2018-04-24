const Fantasypros = require('../external/fantasypros');
const PlayersQueries = require('../queries/players_queries');

const Import = {
  fantasypros: function(){
    return Fantasypros.getData().then(players => {
      return PlayersQueries.updateFromJson(JSON.stringify(players),'fp');
    })
  }
};

module.exports = Import