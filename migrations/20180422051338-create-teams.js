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
  return db.createTable('teams',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    name:                   {type: 'text'},
    owner:                  {type: 'text'},
    league_id:              {type: 'int', notNull: true, foreignKey: { name: 'teams_league_id_fk', table: 'leagues', mapping: 'id', rules: {onDelete: 'CASCADE'} }},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'}
  }).then(() => {
    return db.runSql(`
      create trigger timestamps_on_teams 
      before insert or update on teams 
      for each row execute procedure timestamp_on_change();
    `);
  }).then(() => {
    return db.addIndex('teams','index_leagues_on_league_id',['league_id']);
  });
};

exports.down = function(db) {
  db.dropTable('teams');
};

exports._meta = {
  "version": 1
};
