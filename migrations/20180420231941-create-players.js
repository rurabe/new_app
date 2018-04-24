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
  return db.createTable('players',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    name:                   {type: 'text'},
    position:               {type: 'text'},
    franchise_id:           {type: 'int', foreignKey: { name: 'players_franchise_id_fk', table: 'franchises', mapping: 'id', rules: {onDelete: 'RESTRICT'} }},
    nfl_id:                 {type: 'int'},
    yahoo_id:               {type: 'int'},
    espn_id:                {type: 'int'},
    fp_id:                  {type: 'int'},
    ffc_id:                 {type: 'int'},
    fp_standard_mean:       {type: 'real'},
    fp_standard_std_dev:    {type: 'real'},
    fp_ppr_mean:            {type: 'real'},
    fp_ppr_std_dev:         {type: 'real'},
    ffc_standard_mean:      {type: 'real'},
    ffc_standard_std_dev:   {type: 'real'},
    ffc_ppr_mean:           {type: 'real'},
    ffc_ppr_std_dev:        {type: 'real'},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'}
  }).then(() => {
    return db.runSql(`
      create trigger timestamps_on_players 
      before insert or update on players 
      for each row execute procedure timestamp_on_change();
    `);
  }).then(() => {
    return db.addIndex('players','index_players_on_franchise_id',['franchise_id']);
  }).then(() => {
    return db.addIndex('players','index_players_on_yahoo_id',['yahoo_id'],true);
  }).then(() => {
    return db.addIndex('players','index_players_on_espn_id',['espn_id'],true);
  }).then(() => {
    return db.addIndex('players','index_players_on_fp_id',['fp_id'],true);
  }).then(() => {
    return db.addIndex('players','index_players_on_ffc_id',['ffc_id'],true);
  }).then(() => {
    return db.runSql('CREATE INDEX index_players_on_name_trgm ON players USING gist(name gist_trgm_ops);')
  });
};

exports.down = function(db) {
  return db.dropTable('players');
};

exports._meta = {
  "version": 1
};
