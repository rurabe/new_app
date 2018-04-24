const DB = require('../server/db');

const _sourceTypes = {
  fp: '',
  ffc: '()',
};

const _updates = {
  fp: 'fp_standard_mean,fp_standard_std_dev,fp_ppr_mean,fp_ppr_std_dev'
}

const PlayersQueries = {
  updateFromJson: function(players,source){
    return DB.any(`
      with update_json as (
        select * 
        from json_to_recordset($1) as json(fp_id int, name text, position text, team text, fp_standard_mean real, fp_standard_std_dev real, fp_ppr_mean real, fp_ppr_std_dev real)
      ),
      updated as (
        update players set 
          fp_standard_mean = update_json.fp_standard_mean,
          fp_standard_std_dev = update_json.fp_standard_mean,
          fp_ppr_mean = update_json.fp_standard_mean,
          fp_ppr_std_dev = update_json.fp_standard_mean
        from update_json
        where players.fp_id = update_json.fp_id
        returning players.*
      ),
      not_updated as (
        select * from update_json
        left join updated on update_json.fp_id = updated.fp_id
        where updated.id is null
      )
      select json_build_object('updated',(select json_agg(updated) from updated),'not_updated',(select json_agg(not_updated) from not_updated)) as import;
    `,[players])
  },
  insertFromJson: function(players){
    return DB.any(`
      with insert_json as (
        select json.*, teams.id as team_id
        from json_to_recordset($1) as json (fp_id int, name text, position text, team text, fp_standard_mean real, fp_standard_std_dev real, fp_ppr_mean real, fp_ppr_std_dev real)
        left join teams on teams.abbv = json.team
      )
      insert into players (fp_id,name,position,fp_standard_mean,fp_standard_std_dev,fp_ppr_mean,fp_ppr_std_dev,team_id)
      select fp_id,name,position,fp_standard_mean,fp_standard_std_dev,fp_ppr_mean,fp_ppr_std_dev,team_id
      from insert_json
      returning *;
    `,[players])
  }
};

module.exports = PlayersQueries;