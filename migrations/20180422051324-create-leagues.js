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
  return db.createTable('leagues',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    name:                   {type: 'text'},
    site:                   {type: 'text'},
    site_id:                {type: 'int'},
    user_id:                {type: 'int', notNull: true, foreignKey: { name: 'leagues_user_id_fk', table: 'users', mapping: 'id', rules: {onDelete: 'CASCADE'} }},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'}
  }).then(() => {
    return db.runSql(`
      create trigger timestamps_on_leagues 
      before insert or update on leagues 
      for each row execute procedure timestamp_on_change();
    `);
  }).then(() => {
    return db.addIndex('leagues','index_leagues_on_user_id',['user_id']);
  });
};

exports.down = function(db) {
  db.dropTable('leagues');
};

exports._meta = {
  "version": 1
};
