const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  dateStrings: true,   //强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，而不是一javascript Date对象返回.
  multipleStatements: true    // 多语句查询
});

module.exports = {
  getAllRes(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getAllRes;
      connection.query(sql, (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  
}
