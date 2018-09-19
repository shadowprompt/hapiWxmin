const setProcess =  require('../utils/setProcess');

if (process.env.NODE_ENV === 'production') {
  const envs = require('../env.prod.json');
  setProcess(envs);
} else {
  const envs = require('../env.json');
  setProcess(envs);
}

const {
  env
} = process;

module.exports = {
  "development": {
    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DB_NAME,
    "host": env.MYSQL_HOST,
    "port": env.MYSQL_PORT,
    "appSecret": env.JWT_SECRET,
    "dialect": "mysql",
    "operatorsAliases": false,
  },  
  "production": {
    "username": env.MYSQL_USERNAME,
    "password": env.MYSQL_PASSWORD,
    "database": env.MYSQL_DB_NAME,
    "host": env.MYSQL_HOST,
    "port": env.MYSQL_PORT,
    "appSecret": env.JWT_SECRET,
    "dialect": "mysql",
    "operatorsAliases": false,
  }
}

// module.exports = {
//   "development": {
//     [Symbol("username")]: env.MYSQL_USERNAME,
//     [Symbol("password")]: env.MYSQL_PASSWORD,
//     [Symbol("database")]: env.MYSQL_DB_NAME,
//     [Symbol("host")]: env.MYSQL_HOST,
//     [Symbol("port")]: env.MYSQL_PORT,
//     [Symbol("dialect")]: "mysql"
//   },
//   "production": {
//     [Symbol("username")]: env.MYSQL_USERNAME,
//     [Symbol("password")]: env.MYSQL_PASSWORD,
//     [Symbol("database")]: env.MYSQL_DB_NAME,
//     [Symbol("host")]: env.MYSQL_HOST,
//     [Symbol("port")]: env.MYSQL_PORT,
//     [Symbol("dialect")]: "mysql"
//   }
// };