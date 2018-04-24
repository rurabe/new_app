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
  return db.createTable('franchises',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    name:                   {type: 'text'},
    abbv:                   {type: 'text'},
    bye:                    {type: 'int'},
    schedule:               {type: 'text[]'},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'}
  }).then(() => {
    return db.runSql(`
      create trigger timestamps_on_franchises 
      before insert or update on franchises 
      for each row execute procedure timestamp_on_change();
    `);
  }).then(() => {
    return db.addIndex('franchises','index_franchises_on_abbv',['abbv'],true);
  });
};

exports.down = function(db) {
  db.dropTable('franchises');
};

exports._meta = {
  "version": 1
};
