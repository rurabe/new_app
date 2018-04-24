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
  return db.createTable('users',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    email:                  {type: 'text'},
    name:                   {type: 'text'},
    provider:               {type: 'text'},
    uid:                    {type: 'text'},
    encrypted_password:     {type: 'text'},
    reset_password_token:   {type: 'text'},
    reset_password_sent_at: {type: 'timestamp'},
    remember_created_at:    {type: 'timestamp'},
    sign_in_count:          {type: 'int', defaultValue: 0},
    current_sign_in_at:     {type: 'timestamp'},
    last_sign_in_at:        {type: 'timestamp'},
    current_sign_in_ip:     {type: 'inet'},
    last_sign_in_ip:        {type: 'inet'},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'}
  }).then(() => {
    return db.runSql(`
      create trigger timestamps_on_users 
      before insert or update on users 
      for each row execute procedure timestamp_on_change();
    `);
  }).then(() => {
    return db.runSql('create unique index index_users_on_email on users(email) where encrypted_password is not null;');
  }).then(() => {
    return db.addIndex('users','index_users_on_reset_password_token',['reset_password_token'],true);
  }).then(() => {
    return db.addIndex('users','index_users_on_provider_information',['provider','uid'],true);
  });
};

exports.down = function(db) {
  db.dropTable('users');
};

exports._meta = {
  "version": 1
};
