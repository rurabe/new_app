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
  return db.createTable('pick',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    number:                 {type: 'text', notNull: true},
    league_id:              {type: 'int', notNull: true, foreignKey: { name: 'picks_league_id_fk', table: 'leagues', mapping: 'id', rules: {onDelete: 'CASCADE'} }},
    team_id:                {type: 'int', foreignKey: { name: 'picks_team_id_fk', table: 'teams', mapping: 'id', rules: {onDelete: 'CASCADE'} }},
    player_id:              {type: 'int', foreignKey: { name: 'picks_player_id_fk', table: 'players', mapping: 'id', rules: {onDelete: 'RESTRICT'} }},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'}
  }).then(() => {
    return db.runSql(`
      create trigger timestamps_on_picks 
      before insert or update on picks 
      for each row execute procedure timestamp_on_change();
    `);
  }).then(() => {
    return db.addIndex('picks','index_picks_on_one_player_per_league',['player_id','league_id'],true);
  }).then(() => {
    return db.addIndex('picks','index_picks_on_league_order',['league_id','number'],true);
  }).then(() => {
    return db.addIndex('picks','index_picks_on_team_id',['team_id']);
  })
};

exports.down = function(db) {
  db.dropTable('picks');
};

exports._meta = {
  "version": 1
};
