const Promise = require('bluebird');
const cheerio = require('cheerio');
const EventEmitter = require('events');
const request = require('superagent');

const _getUrl = function(format){
  const sheet = (format === 'ppr' ? 'ppr' : 'consensus');
  return `https://www.fantasypros.com/nfl/rankings/${sheet}-cheatsheets.php`
};

const _normalizedTeams = {
  JAC: 'JAX'
};

const _normalizeTeam = function(team){
  return _normalizedTeams[team] || team;
}

const Fantasypros = {
  getData: () => {
    return Promise.map(['standard','ppr'],format => {
      return request.get(_getUrl(format)).then(resp => {
        let $ = cheerio.load(resp.text);
        return $('.player-row').map((i,row) => {
          let r = $(row);
          let rowData = {};
          rowData['fp_id'] = r.attr('data-id');
          rowData['name'] = r.find('.full-name').text();
          rowData['position'] = r.find('td:nth-child(4)').text().replace(/\d+$/,'');
          rowData['team'] = r.find('.player-label small.grey').text();
          rowData[`fp_${format}_mean`] = r.find('td:nth-child(8)').text();
          rowData[`fp_${format}_std_dev`] = r.find('td:nth-child(9)').text();
          return rowData;
        }).get();
      });
    },{concurrency: 2}).then(formats => {
      let results = {};
      formats.forEach(format => {
        format.forEach(row => {
          results[row.fp_id] = {...results[row.fp_id], ...row};
        })
      });
      return Object.values(results);
    });
  }
};

module.exports = Fantasypros;