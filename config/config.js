module.exports = {
  development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false
  },
  test: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    dialect: 'mysql'
  }
};
