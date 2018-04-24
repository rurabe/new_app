'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
    INSERT INTO franchises(name,abbv,schedule,created_at,updated_at) VALUES 
    ('Arizona Cardinals', 'ARI', ARRAY['WAS', '@LAR', 'CHI', 'SEA', '@SF', '@MIN', 'DEN', 'SF', 'BYE', '@KC', 'OAK', '@LAC', '@GB', 'DET', '@ATL', 'LAR', '@SEA'], now(),now()),
    ('Atlanta Falcons', 'ATL', ARRAY['@PHI', 'CAR', 'NO', 'CIN', '@PIT', 'TB', 'NYG', 'BYE', '@WAS', '@CLE', 'DAL', '@NO', 'BAL', '@GB', 'ARI', '@CAR', '@TB'], now(),now()),
    ('Baltimore Ravens', 'BAL', ARRAY['BUF', '@CIN', 'DEN', '@PIT', '@CLE', '@TEN', 'NO', '@CAR', 'PIT', 'BYE', 'CIN', 'OAK', '@ATL', '@KC', 'TB', '@LAC', 'CLE'], now(),now()),
    ('Buffalo Bills', 'BUF', ARRAY['@BAL', 'LAC', '@MIN', '@GB', 'TEN', '@HOU', '@IND', 'NE', 'CHI', '@NYJ', 'BYE', 'JAX', '@MIA', 'NYJ', 'DET', '@NE', 'MIA'], now(),now()),
    ('Carolina Panthers', 'CAR', ARRAY['DAL', '@ATL', 'CIN', 'BYE', 'NYG', '@WAS', '@PHI', 'BAL', 'TB', '@PIT', '@DET', 'SEA', '@TB', '@CLE', 'NO', 'ATL', '@NO'], now(),now()),
    ('Chicago Bears', 'CHI', ARRAY['@GB', 'SEA', '@ARI', 'TB', 'BYE', '@MIA', 'NE', 'NYJ', '@BUF', 'DET', 'MIN', '@DET', '@NYG', 'LAR', 'GB', '@SF', '@MIN'], now(),now()),
    ('Cincinnati Bengals', 'CIN', ARRAY['@IND', 'BAL', '@CAR', '@ATL', 'MIA', 'PIT', '@KC', 'TB', 'BYE', 'NO', '@BAL', 'CLE', 'DEN', '@LAC', 'OAK', '@CLE', '@PIT'], now(),now()),
    ('Cleveland Browns', 'CLE', ARRAY['PIT', '@NO', 'NYJ', '@OAK', 'BAL', 'LAC', '@TB', '@PIT', 'KC', 'ATL', 'BYE', '@CIN', '@HOU', 'CAR', '@DEN', 'CIN', '@BAL'], now(),now()),
    ('Dallas Cowboys', 'DAL', ARRAY['@CAR', 'NYG', '@SEA', 'DET', '@HOU', 'JAX', '@WAS', 'BYE', 'TEN', '@PHI', '@ATL', 'WAS', 'NO', 'PHI', '@IND', 'TB', '@NYG'], now(),now()),
    ('Denver Broncos', 'DEN', ARRAY['SEA', 'OAK', '@BAL', 'KC', '@NYJ', 'LAR', '@ARI', '@KC', 'HOU', 'BYE', '@LAC', 'PIT', '@CIN', '@SF', 'CLE', '@OAK', 'LAC'], now(),now()),
    ('Detroit Lions', 'DET', ARRAY['NYJ', '@SF', 'NE', '@DAL', 'GB', 'BYE', '@MIA', 'SEA', '@MIN', '@CHI', 'CAR', 'CHI', 'LAR', '@ARI', '@BUF', 'MIN', '@GB'], now(),now()),
    ('Green Bay Packers', 'GB',  ARRAY['CHI', 'MIN', '@WAS', 'BUF', '@DET', 'SF', 'BYE', '@LAR', '@NE', 'MIA', '@SEA', '@MIN', 'ARI', 'ATL', '@CHI', '@NYJ', 'DET'], now(),now()),
    ('Houston Texans', 'HOU', ARRAY['@NE', '@TEN', 'NYG', '@IND', 'DAL', 'BUF', '@JAX', 'MIA', '@DEN', 'BYE', '@WAS', 'TEN', 'CLE', 'IND', '@NYJ', '@PHI', 'JAX'], now(),now()),
    ('Indianapolis Colts', 'IND', ARRAY['CIN', '@WAS', '@PHI', 'HOU', '@NE', '@NYJ', 'BUF', '@OAK', 'BYE', 'JAX', 'TEN', 'MIA', '@JAX', '@HOU', 'DAL', 'NYG', '@TEN'], now(),now()),
    ('Jacksonville Jaguars', 'JAX', ARRAY['@NYG', 'NE', 'TEN', 'NYJ', '@KC', '@DAL', 'HOU', 'PHI', 'BYE', '@IND', 'PIT', '@BUF', 'IND', '@TEN', 'WAS', '@MIA', '@HOU'], now(),now()),
    ('Kansas City Chiefs', 'KC',  ARRAY['@LAC', '@PIT', 'SF', '@DEN', 'JAX', '@NE', 'CIN', 'DEN', '@CLE', 'ARI', '@LAR', 'BYE', '@OAK', 'BAL', 'LAC', '@SEA', 'OAK'], now(),now()),
    ('Los Angeles Rams', 'LAR', ARRAY['@OAK', 'ARI', 'LAC', 'MIN', '@SEA', '@DEN', '@SF', 'GB', '@NO', 'SEA', 'KC', 'BYE', '@DET', '@CHI', 'PHI', '@ARI', 'SF'], now(),now()),
    ('Los Angeles Chargers', 'LAC', ARRAY['KC', '@BUF', '@LAR', 'SF', 'OAK', '@CLE', 'TEN', 'BYE', '@SEA', '@OAK', 'DEN', 'ARI', '@PIT', 'CIN', '@KC', 'BAL', '@DEN'], now(),now()),
    ('Miami Dolphins', 'MIA', ARRAY['TEN', '@NYJ', 'OAK', '@NE', '@CIN', 'CHI', 'DET', '@HOU', 'NYJ', '@GB', 'BYE', '@IND', 'BUF', 'NE', '@MIN', 'JAX', '@BUF'], now(),now()),
    ('Minnesota Vikings', 'MIN', ARRAY['SF', '@GB', 'BUF', '@LAR', '@PHI', 'ARI', '@NYJ', 'NO', 'DET', 'BYE', '@CHI', 'GB', '@NE', '@SEA', 'MIA', '@DET', 'CHI'], now(),now()),
    ('New England Patriots', 'NE',  ARRAY['HOU', '@JAX', '@DET', 'MIA', 'IND', 'KC', '@CHI', '@BUF', 'GB', '@TEN', 'BYE', '@NYJ', 'MIN', '@MIA', '@PIT', 'BUF', 'NYJ'], now(),now()),
    ('New Orleans Saints', 'NO',  ARRAY['TB', 'CLE', '@ATL', '@NYG', 'WAS', 'BYE', '@BAL', '@MIN', 'LAR', '@CIN', 'PHI', 'ATL', '@DAL', '@TB', '@CAR', 'PIT', 'CAR'], now(),now()),
    ('New York Giants', 'NYG', ARRAY['JAX', '@DAL', '@HOU', 'NO', '@CAR', 'PHI', '@ATL', 'WAS', 'BYE', '@SF', 'TB', '@PHI', 'CHI', '@WAS', 'TEN', '@IND', 'DAL'], now(),now()),
    ('New York Jets', 'NYJ', ARRAY['@DET', 'MIA', '@CLE', '@JAX', 'DEN', 'IND', 'MIN', '@CHI', '@MIA', 'BUF', 'BYE', 'NE', '@TEN', '@BUF', 'HOU', 'GB', '@NE'], now(),now()),
    ('Oakland Raiders', 'OAK', ARRAY['LAR', '@DEN', '@MIA', 'CLE', '@LAC', 'SEA', 'BYE', 'IND', '@SF', 'LAC', '@ARI', '@BAL', 'KC', 'PIT', '@CIN', 'DEN', '@KC'], now(),now()),
    ('Philadelphia Eagles', 'PHI', ARRAY['ATL', '@TB', 'IND', '@TEN', 'MIN', '@NYG', 'CAR', '@JAX', 'BYE', 'DAL', '@NO', 'NYG', 'WAS', '@DAL', '@LAR', 'HOU', '@WAS'], now(),now()),
    ('Pittsburgh Steelers', 'PIT', ARRAY['@CLE', 'KC', '@TB', 'BAL', 'ATL', '@CIN', 'BYE', 'CLE', '@BAL', 'CAR', '@JAX', '@DEN', 'LAC', '@OAK', 'NE', '@NO', 'CIN'], now(),now()),
    ('San Francisco 49ers', 'SF',  ARRAY['@MIN', 'DET', '@KC', '@LAC', 'ARI', '@GB', 'LAR', '@ARI', 'OAK', 'NYG', 'BYE', '@TB', '@SEA', 'DEN', 'SEA', 'CHI', '@LAR'], now(),now()),
    ('Seattle Seahawks', 'SEA', ARRAY['@DEN', '@CHI', 'DAL', '@ARI', 'LAR', '@OAK', 'BYE', '@DET', 'LAC', '@LAR', 'GB', '@CAR', 'SF', 'MIN', '@SF', 'KC', 'ARI'], now(),now()),
    ('Tampa Bay Buccaneers', 'TB',  ARRAY['@NO', 'PHI', 'PIT', '@CHI', 'BYE', '@ATL', 'CLE', '@CIN', '@CAR', 'WAS', '@NYG', 'SF', 'CAR', 'NO', '@BAL', '@DAL', 'ATL'], now(),now()),
    ('Tennessee Titans', 'TEN', ARRAY['@MIA', 'HOU', '@JAX', 'PHI', '@BUF', 'BAL', '@LAC', 'BYE', '@DAL', 'NE', '@IND', '@HOU', 'NYJ', 'JAX', '@NYG', 'WAS', 'IND'], now(),now()),
    ('Washington Redskins', 'WAS', ARRAY['@ARI', 'IND', 'GB', 'BYE', '@NO', 'CAR', 'DAL', '@NYG', 'ATL', '@TB', 'HOU', '@DAL', '@PHI', 'NYG', '@JAX', '@TEN', 'PHI'],  now(),now());

    UPDATE franchises SET bye=array_position(schedule,'BYE');    
  `);
};

exports.down = function(db) {
  return db.runSql(`DELETE FROM franchises;`);
};

exports._meta = {
  "version": 1
};
